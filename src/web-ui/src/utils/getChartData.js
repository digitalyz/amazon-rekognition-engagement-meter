const getChartData = (data) => {
  const output = {
    happyometer: null,
    aggregate: null,
  };

  const totals = {
    Colère: 0,
    calm: 0,
    happy: 0,
    sad: 0,
    surprised: 0,
    total: 0,
  };

  data.results.forEach(function (result) {
    totals.angry += parseInt(result.angry, 10);
    totals.calm += parseInt(result.calm, 10);
    totals.happy += parseInt(result.happy, 10);
    totals.sad += parseInt(result.sad, 10);
    totals.surprised += parseInt(result.surprised, 10);
    totals.total =
      totals.angry + totals.calm + totals.happy + totals.sad + totals.surprised;
  });

  if (totals.total > 0) {
    output.happyometer = Math.floor(
      (totals.happy / totals.total) * 100 +
        (totals.surprised / totals.total) * 100
    );

    output.aggregate = {
      colère: Math.floor((totals.angry / totals.total) * 100),
      calme: Math.floor((totals.calm / totals.total) * 100),
      heureux: Math.floor((totals.happy / totals.total) * 100),
      triste: Math.floor((totals.sad / totals.total) * 100),
      surpris: Math.floor((totals.surprised / totals.total) * 100),
    };
  }
  return output;
};

export default getChartData;
