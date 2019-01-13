function buildMetadata(sample) {
  
    // @TODO: Complete the following function that builds the metadata panel
    // Use `Object.entries` to add each key and value pair to the panel
    //  loading the data by using object .entries
    // Use `.html("") to clear any existing metadata
     // PANEL.innerHTML = '';
     var url = "/bubble";
     d3.json(url).then(function(response) {
        
        console.log(response);        
    //  d3.json(`/metadata/${sample}`).then((Smedata) => {
    //    console.log(Smedata);
      
       var PANEL = d3.select("#sample-metadata")
       PANEL.html("");
     var setdata = Object.entries(Smedata);
     setdata.forEach((metdata) => {
          PANEL.append("h6").text(`${metdata[0]}:${metdata[1]}`);
     });
    
     console.log("building metadata")
    
    });
    }
    
    // Pie chart for top 10 values 
    // Create a PIE chart that uses data from your samples route (/samples/<sample>) to display the top 10 samples.
    
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).function  Piechart(sample) {
    //Gets data ready for the pie chart
    function Piechart(sample){
       d3.json(`/samples/${sample}`).then((Piedata) =>
       {
         console.log("Piedata")
    
         // error trapping for failed call from Flask
        //  if (error) return console.warn(error);
    
    
         // parses repsonse data and take slice of first ten
         // data pairs returned from Flask
        
  
         console.log(Piedata.otu_ids);
         console.log(Piedata.otu_labels);
         console.log(Piedata.sample_values);
        
         // function running
         const otu_ids = Piedata.otu_ids;
         const otu_labels = Piedata.otu_labels;
         const sample_values = Piedata.sample_values;
    
        
        
             var layout = {
               title: "'Belly Button pie' Chart",
             };
             var data = [{
              values: sample_values.slice(0,10),
             
              labels : otu_ids.slice(0,10),
              // hovertext: labels.slice(0, 10),
              hoverinfo: 'hovertext',
              type: 'pie'
          }]; 
    
             Plotly.newPlot("pie", data, layout);
         
       });
      
      }
           
     
    // // Bubble plot
    function  Bubblechart(sample) {
      //     //Gets data ready for the pie chart
         d3.json(`/samples/${sample}`).then((Bbldata) =>
         {
           console.log("Bbldata")
      // printing the data for bubble
           console.log(Bbldata.otu_ids);
           console.log(Bbldata.otu_labels);
           console.log(Bbldata.sample_values);
    
           // function runnin
         const otu_ids = Bbldata.otu_ids;
         const otu_labels = Bbldata.otu_labels;
         const sample_values = Bbldata.sample_values;
  
    // plotting with the data
        var bubbleLayout = {
          xaxis:{ title: "OTU_ID" }
        };
  
        var Bdata = [
          {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
              size: sample_values,
              color: otu_ids,
              hovermode: 'closest',
              colorscale: "Earth",
              type: "scatter"
              
  
            }
      
          }];
          Plotly.newPlot("bubble", Bdata, bubbleLayout);
  
          // use the same variab;es we defined
          // use .slice(0,10)
        });
      }
  
       // \calling init function by using .D3 for each /appending sample valuesw
       // function init
    
    
    function init() {
    
     console.log("init")
    
     // Grab a reference to the dropdown select element
     var selector = d3.select("#selDataset");
    
     // Use the list of sample names to populate the select options
     d3.json("/names").then((sampleNames) => {
       sampleNames.forEach((sample) => {
         selector
           .append("option")
           .text(sample)
           .property("value", sample);
       });
    
       // Use the first sample from the list to build the initial plots
       const sample = sampleNames[0];
      //  buildCharts(firstSample);
  
       buildMetadata(sample);
       Piechart(sample);
       Bubblechart(sample)
    
    
     });
    }
    
    function optionChanged(newSample) {
    
     console.log("option changed")
     // Fetch new data each time a new sample is selected
  
  
  
    //  buildCharts(newSample);
    buildMetadata(newSample);
    Piechart(newSample);
    Bubblechart(newSample);
    
    }
    
    // Initialize the dashboard
    init();