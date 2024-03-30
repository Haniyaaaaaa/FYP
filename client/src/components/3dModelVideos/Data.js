import great from "../../images/great.PNG";
import mostPowerful from "../../images/most powerful.PNG";
import pakistan from "../../images/pakistan.PNG";
import germany from "../../images/germany.PNG";
import extreme from "../../images/extreme.PNG";
import kerala from "../../images/kerala.PNG";
import john from "../../images/john.PNG";

const Data = [
  {
    img: great,
    link: "https://www.youtube.com/watch?v=udcDK_ZLYB0",
    title:
      "The Great Flood: Investigating One of History's Greatest Myths | Full Documentary",
  },
  {
    img: mostPowerful,
    link: "https://www.youtube.com/watch?v=Ipo1-I1RDaw",
    title:
      "Most Powerful Forces on Earth: Floods | Fatal Forecast | Free Documentary",
  },
  {
    img: pakistan,
    link: "https://www.youtube.com/watch?v=YDH6kJdQ5q4",
    title:
      "Pakistan Had Its Worst Flood In Recent History. Now What? | Insight | Full Episode",
  },
  {
    img: germany,
    link: "https://www.youtube.com/watch?v=9LJYUkaL5yk",
    title: "Germany's flood catastrophe one year on | DW Documentary",
  },
  {
    img: extreme,
    link: "https://www.youtube.com/watch?v=HCUWKrWwMDk",
    title:
      "Extreme weather, rising sea levels, devastating floods - The global climate crisis | DW Documentary",
  },
  {
    img: kerala,
    link: "https://www.youtube.com/watch?v=c5DFTXc3UVw",
    title:
      "How Kerala Survived the Floods | Megafloods | Full Episode | National Geographic",
  },
  {
    img: john,
    link: "https://www.youtube.com/watch?v=1SM6eZ-QuV8",
    title: "Johnstown Flood - Full Movie (Feature Documentary)",
  },
];
function convertToEmbeddedLinks(data) {
  return data.map((item) => {
    const videoId = item.link.split("=")[1].split("&")[0];
    const embedLink = `https://www.youtube.com/embed/${videoId}`;
    return {
      ...item,
      link: embedLink,
    };
  });
}

const embeddedData = convertToEmbeddedLinks(Data);
console.log(embeddedData);

export default embeddedData;
