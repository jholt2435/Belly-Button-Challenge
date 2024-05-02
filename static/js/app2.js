function buildMetadata(sample) {
    d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
  
      // Filter the metadata for the object with the desired sample number
      var metadata = data.metadata
      let result_array = metadata.filter(sampleObj => sampleObj.id == sample)
      let result = result_array[0];
    //   console.log(metadata);
  
      // Use d3 to select the panel with id of `#sample-metadata`
      let PANEL = d3.select("#sample-metadata");
  
      // Use `.html("")` to clear any existing metadata
        PANEL.html("");
  
      // Inside a loop, you will need to use d3 to append new
      // tags for each key-value in the filtered metadata.
      for (key in result) {
        PANEL.append("h6").text(`${key.toUpperCase()}: ${result[key]}`);
      };
    //   Object.entries(metadata).forEach(([key, value]) => {
    //     panel.append("p").text(`${key}: ${value}`);
    //   }
    // buildGauge(result.wfreq);
    });
}


function buildCharts(sample) {
    
    d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
  
      // Filter the samples for the object with the desired sample number
      let samples = data.samples;
      let result_array = samples.filter(sampleObj => sampleObj.id == sample)
      let result = result_array[0];
          //   var selectedSample = data.samples.filter(sampleData => sampleData.id === sample)[0];
  
      // Get the otu_ids, otu_labels, and sample_values
      let otu_ids = result.otu_ids;
      let otu_labels = result.otu_labels;
      let sample_values = result.sample_values;
  
      // Build a Bubble Chart
      let bubbleTrace = {
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: 'markers',
        marker: {
          size: sample_values,
          color: otu_ids,
          colorscale: 'Earth'
        }
      };
      var bubbleData = [bubbleTrace];
  
      var bubbleLayout = {
        title: 'OTU Bubble Chart',
        margin :{t:0},
        hovermode :"closest",
        xaxis: {title: "OTU ID"},
        yaxis: { title: 'Sample Values' }
      };
  
      // Render the Bubble Chart
      Plotly.newPlot('bubble', bubbleData, bubbleLayout);
  
      // For the Bar Chart, map the otu_ids to a list of strings for your yticks
      // Build a Bar Chart
      // Don't forget to slice and reverse the input data appropriately
      // Render the Bar Chart
      let yticks = otu_ids.slice(0,10).map(otuID => `OTU ${otuID}`).reverse();
      let barData = [{
            y : yticks,
            x : sample_values.slice(0,10).reverse(),
            text : otu_labels.slice(0,10).reverse(),
            type : "bar",
            orientation :"h",


    }];
    barLayout = {
        title : "Top 10 Bacteria Cultures Found",
        margin : {t :30 , l : 150}
    };
    Plotly.newPlot("bar",barData,barLayout)
    });
  }


  function init() {
    d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
      // Get the names field
    let  selector = d3.select("#selDataset");
    let sampleNames = data.names;
      // Use d3 to select the dropdown with id of `#selDataset`
      
  
      // Use the list of sample names to populate the select options
    for (let i = 0 ; i < sampleNames.length; i++) {
        selector
        .append("option")
        .text(sampleNames[i])
        .property("value", sampleNames[i]);

    };
  
      // Get the first sample from the list
      var firstSample = sampleNames[0];
  
      // Build charts and metadata panel with the first sample
      buildCharts(firstSample);
      buildMetadata(firstSample);
    });
  }
  function optionChanged(newSample) {
    // Build charts and metadata panel each time a new sample is selected
    buildCharts(newSample);
    buildMetadata(newSample);
  }

  init();