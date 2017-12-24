new Vue({
  el: "#app",
  data: {
    searchPersonName: "",
    person: [],
    searchHistory: []
  },
  created: function() {
    this.fetchData();
    this.readCookie();
  },
  computed: {
    hasData: function() {
      return this.person != null;
    },
    filterPerson: function() {
      return this.person.filter(
        p => p.name.indexOf(this.searchPersonName) > -1
      );
    }
  },
  methods: {
    fetchData: function() {
      const self = this;
      fetch("./get/schedule", {
        method: "GET"
      })
        .then(response => response.json())
        .then(json => (self.person = json));
    },
    writeCookie: function() {
      const self = this;
      if (!self.searchPersonName) {
        return;
      }
      self.searchHistory.unshift(self.searchPersonName);
      const ajast = searchHistory => {
        if (searchHistory.length > 5) {
          searchHistory.pop();
          ajast(searchHistory);
        }
      };
      ajast(self.searchHistory);
      let cookieValue = self.searchHistory.join();
      cookieValue = encodeURIComponent(cookieValue);
      document.cookie = "_schedule=" + cookieValue;
    },
    readCookie: function() {
      const self = this;

      const getCookieValue = () => {
        for (let cookie of document.cookie.split("; ")) {
          const [name, value] = cookie.split("=");
          if (name === "_schedule") {
            return decodeURIComponent(value);
          }
        }
      };

      const cookieValue = getCookieValue();
      if (cookieValue) {
        self.searchHistory = cookieValue.split(",");
      }
    },
    selectHistory: function(inputValue) {
      this.searchPersonName = inputValue;
    }
  }
});
