AFRAME.registerComponent("tour", {
    schema: {
      state: { type: "string", default: "places-list" },
      selectedPlace: { type: "string", default: "#card1" },
    },
    init: function() {
      this.placesContainer = this.el;
      this.cameraEl = document.querySelector("#camera");
      this.createPlace();
    },
    tick: function() {
      const { state } = this.el.getAttribute("tour");
  
      if (state === "view") {
        this.hideEl([this.placesContainer]);
        this.showView();
      }
    },

    hideEl: function(elList) {
      elList.map(el => {
        el.setAttribute("visible", false);
      });
    },

    createPlace: function() {
      const details = {
        garden: {
          position: { x: 20, y: -4.5, z: -5.5 },
          rotation: { x: 0, y: -90, z: 0 },
          src: "./assets/thumbnails/garden.png",
          title: "Garden",
          id: "garden"
        },
        gate: {
          position: { x: 4.6, y: -5.5, z: 25 },
          rotation: { x: 180, y: 0, z: 0 },
          src: "./assets/thumbnails/gate.png",
          title: "Main Gate",
          id: "gate"
        },
        home: {
          position: { x: -9, y: 34, z: -100 },
          rotation: { x: 0, y: 0, z: 0 },
          src: "./assets/thumbnails/home.png",
          title: "Home",
          id: "home"
        }
      };
  
      for (var key in details) {
        const item = details[key];
        // Thubnail Element
        const thumbNail = this.createThumbNail(item);
        // Title
        const title = this.createTitleEl(item);
        thumbNail.appendChild(title);
        this.placesContainer.appendChild(thumbNail);
      }
    },
  
    createThumbNail: function(item) {
      const element = document.createElement("a-entity");
      const id = `place-${item.id}`;
      element.setAttribute("visible", true);
      element.setAttribute("id", id);
      element.setAttribute("geometry", {
        primitive: "circle",
        radius: 3
      });
      element.setAttribute("position", item.position);
      element.setAttribute("rotation", item.rotation);
      element.setAttribute("material", { src: item.src, opacity: 0.6 });
      element.setAttribute("cursor-listener", {});
      return element;
    },
    createTitleEl: function(item) {
      const element = document.createElement("a-entity");
      const id = `title-${item.id}`;
      element.setAttribute("text", {
        font: "exo2bold",
        align: "center",
        width: 50,
        color: "#e91e63",
        value: item.title
      });
      const position = { x: 0, y: -4, z: 0 };
      element.setAttribute("position", position);
  
      if (item.title === "Main Gate") {
        element.setAttribute("rotation", { x: 180, y: 180, z: 0 });
        element.setAttribute("position", { x: 0, y: 4, z: 0 });
      }
      element.setAttribute("visible", true);
      return element;
    },

    showView: function() {
      const { selectedPlace } = this.data;
      const sky = document.querySelector("#main-container");
      sky.setAttribute("material", {
        src: `./assets/360/${selectedPlace}.jpg`,
        color: "#fff"
      });
    }
  });