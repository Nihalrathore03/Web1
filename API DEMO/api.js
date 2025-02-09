
const btn = document.getElementById("btn-grad");
const img = document.getElementById("img");
const input = document.getElementById("input");
const downloadbtn = document.getElementById("btn-grad1");
const apikey = `Bearer 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`;
;
if (input === "") {
  alert("please enter the prompt here");
}

async function query() {
  // loading image
  img.src = "./new loading gif.gif";
  try {
    const userInput = input.value.trim();
    if (!userInput) {
      throw new Error("Input cannot be empty. Please provide valid text.");
    }
    // GETTING THE APIs
    const response = await fetch(
      // "https://api-inference.huggingface.co/models/ZB-Tech/Text-to-Image",
      // "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev",
      "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-3.5-large",
      {
        headers: {
          Authorization: apikey,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ inputs: userInput }),
      }
    );

    if (!response.ok) {
      const errorMessage = await response.text(); // Capture error response
      throw new Error(`HTTP Error: ${response.status} - ${errorMessage}`);
    }

    return await response.blob();
  } catch (error) {
    console.error("Error querying the API:", error);
    throw error;
  }
}
// API  CALLING BUTTON >
btn.addEventListener("click", async function () {
  try {
    const response = await query();
    const url = URL.createObjectURL(response);
    img.src = url;
    console.log("Image successfully loaded:", response);
  } catch (error) {
    console.error("Error handling the response:", error);
    alert(
      "Failed to load the image. Please check the console for more details."
    );
  }
});
// DOWNLOADING BUTTON  WITH DOWNLOADING LOGIC
downloadbtn.addEventListener("click", () => {
  const link = document.createElement("a");
  link.href = img.src;
  // GIVES THE DOWNLOAD PATH IN THE MEMORY
  link.download = "Ai_Pack_image.png";
  link.click();
  // console.log(link.href)
});

