// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
 // get the metadata field
 let metadata = data.metadata;

 // Filter the metadata for the object with the desired sample number
 let sample_metadata = metadata.filter(row => row.id === parseInt(sample))[0]; // or use double equals
 console.log(sample_metadata);

 // Use d3 to select the panel with id of `#sample-metadata`
 let panel = d3.select("#sample-metadata");

 // Use `.html("") to clear any existing metadata
 panel.html("");

 // Inside a loop, you will need to use d3 to append new
 // tags for each key-value in the filtered metadata.
 let metadata_keys = Object.keys(sample_metadata);
 for (let i = 0; i < metadata_keys.length; i++) {
   // get key/value pair
   let key = metadata_keys[i]; // How do I make this uppercase??? Oh no, we will never know...
   let value = sample_metadata[key];

   // add to html
   panel.append("p").text(`${key}: ${value}`);
 }
});
}

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
    let samples = data.samples;

    // Filter the samples for the object with the desired sample number
    let sample_data = samples.filter(row => row.id === sample)[0]; 
    console.log(sample_data);
   

    // Get the otu_ids, otu_labels, and sample_values
    let otu_ids = sample_data.otu_ids;
    let otu_labels = sample_data.otu_labels;
    let sample_values = sample_data.sample_values;
    // Build a Bubble Chart
    let trace = {
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: 'markers',
      marker: {
        color: otu_ids,
        size: sample_values,
        colorscale: 'YlGnBu'
      }
    };
    
    let traces = [trace];
    
    let layout = {
      title: {
        text: 'Cultures Per Sample'
      },
      yaxis: {
        title: {
          text: 'Number of Bacteria'
        }
      },
      xaxis: {
        title: {
          text: 'OTU ID'
        }
      },
      height: 600
    };
    // Render the Bubble Chart
  Plotly.newPlot('bubble', traces, layout);
  });
}    
   
// For the Bar Chart, map the otu_ids to a list of strings for your yticks
//let bar_ticks = otu_ids.map(x => `OTU: ${x}`);

// Build a Bar Chart
//let bar_trace = {
  //y: bar_ticks.slice(0, 10).reverse(), // Get the top 10 OTUs and reverse for horizontal display
  //x: sample_values.slice(0, 10).reverse(), // Get the corresponding sample values
  //type: 'bar',
  //marker: {
    //color: 'blue' // Set the bar color
  //},
  //orientation: 'h' // Horizontal bar chart
//};

//let bar_traces = [bar_trace];

//let bar_layout = {
  //title: {
    //text: 'Top 10 Bacteria Cultures Found' // Title of the chart
  //},
  //xaxis: {
    //title: {
      //text: 'Number of Bacteria' // X-axis title
   // }
  //},
  //height: 600 // Height of the chart
//};

// Render the Bar Chart
  //  Plotly.newPlot('bar', bar_traces, bar_layout);



// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

     // Get the names field
     let names = data.names;

     // Use d3 to select the dropdown with id of `#selDataset`
     let dropdown = d3.select("#selDataset");
 
     // Use the list of sample names to populate the select options
     // Append a new option for each sample name.
     names.forEach(name => {
       dropdown.append("option").text(name).property("value", name); 
      }); 
 
     // Get the first sample from the list
     let first_sample = names[0];
 
     // Build charts and metadata panel with the first sample
     buildMetadata(first_sample);
     buildCharts(first_sample);
   });
  }
 
// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  }

// Initialize the dashboard
init();