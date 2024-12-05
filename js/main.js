(() => {
  const hotspots = document.querySelectorAll(".Hotspot");
  const materialTemplate = document.querySelector("#material-template");
  const materialList = document.querySelector("#material-list");

  function loadInfoBoxes() {
    fetch("https://swiftpixel.com/earbud/api/infoboxes")
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return response.json();
      })
      .then((infoBoxes) => {
        infoBoxes.forEach((infoBox, index) => {
          const selected = document.querySelector(`#hotspot-${index + 1}`);
          if (selected) {
            const titleElement = document.createElement("h2");
            titleElement.textContent = infoBox.heading;

            const textElement = document.createElement("p");
            textElement.textContent = infoBox.description;

            const imageElement = document.createElement("img");
            const imagePath = infoBox.thumbnail
              ? `images/${infoBox.thumbnail}`
              : `images/default-placeholder.png`;

            // Debugging the generated path
            console.log("Generated Image Path:", imagePath);
            imageElement.src = imagePath;
            imageElement.alt = infoBox.heading || "Material Image";

            selected.appendChild(titleElement);
            selected.appendChild(textElement);
            selected.appendChild(imageElement);
          }
        });
      })
      .catch((error) => console.error("Error fetching infoboxes:", error));
  }

  function loadMaterialInfo() {
    fetch("https://swiftpixel.com/earbud/api/infoboxes")
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return response.json();
      })
      .then((materialListData) => {
        materialListData.forEach((material) => {
          const clone = materialTemplate.content.cloneNode(true);

          const materialHeading = clone.querySelector(".material-heading");
          if (materialHeading) materialHeading.textContent = material.heading;

          const materialDescription = clone.querySelector(".material-description");
          if (materialDescription) materialDescription.textContent = material.description;

          const materialImage = clone.querySelector("img");
          const materialImagePath = material.image
            ? `images/${material.image}`
            : `images/default-placeholder.png`;

          // Debugging the generated path
          console.log("Material Image Path:", materialImagePath);
          if (materialImage) {
            materialImage.src = materialImagePath;
            materialImage.alt = material.heading || "Material Image";
          }

          materialList.appendChild(clone);
        });
      })
      .catch((error) => console.error("Error fetching material info:", error));
  }

  function showInfo() {
    const selected = document.querySelector(`#${this.slot}`);
    if (selected) {
      gsap.to(selected, { autoAlpha: 1, duration: 1 });
    }
  }

  function hideInfo() {
    const selected = document.querySelector(`#${this.slot}`);
    if (selected) {
      gsap.to(selected, { autoAlpha: 0, duration: 1 });
    }
  }

  loadInfoBoxes();
  loadMaterialInfo();

  hotspots.forEach((hotspot) => {
    hotspot.addEventListener("mouseenter", showInfo);
    hotspot.addEventListener("mouseleave", hideInfo);
  });
})();
