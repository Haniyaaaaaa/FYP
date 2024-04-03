import axios from "axios";

const fetchVideos = async (req, res) => {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/videos/get-videos"
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching videos:", error);
  }
};
function convertToEmbeddedLinks(data) {
  return data.map((item) => {
    console.log(item);
    const videoId = item.videoLink.split("=")[1].split("&")[0];
    const embedLink = `https://www.youtube.com/embed/${videoId}`;
    return {
      ...item,
      link: embedLink,
    };
  });
}
const videos = await fetchVideos();
const embeddedData = convertToEmbeddedLinks(videos);
console.log(embeddedData);

export default embeddedData;
