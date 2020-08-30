sap.ui.define(["sap/m/Button"], function (Button) {
	
	return Button.extend("ReverseButton", {

		setText: function (text) {
			this.setProperty("text", text.split("").reverse().join(""));
		},

		renderer: {}
	});

});