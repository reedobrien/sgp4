"use strict";


define([
	"tle",
	"cesium/Core/defined",
	"cesium/Core/formatError",
	"cesium/Core/getFilenameFromUri",
	"cesium/Core/JulianDate",
	"cesium/Core/queryToObject",
	"cesium/DataSources/CzmlDataSource",
	"cesium/DataSources/GeoJsonDataSource",
	"cesium/Scene/TileMapServiceImageryProvider",
	"cesium/Widgets/Viewer/Viewer",
	"cesium/Widgets/Viewer/viewerCesiumInspectorMixin",
	"cesium/Widgets/Viewer/viewerDragDropMixin",
	"domReady!"
	],function(
		tls,
		defined,
		formatError,
		getFilenameFromUri,
		queryToObject,
		JulianDate,
		CzmlDataSource,
		GeoJsonDataSource,
		TileMapServiceImageryProvider,
		Viewer,
		viewerCesiumInspectorMixin,
		viewerDragDropMixin
		){

		 // Calculate new Satrecs based on time given as fractional Julian Date
		// (since that's what satrec stores).
		// Return object containing updated list of Satrecs, Rposition, Velocity.
		// We don't have r (position) or v (velocity) in the satrec,
		// so we have to return a those as a list as well; ugly.
		// XXX Should I just add position and velocity to the satrec objects?
		function updateSatrecsPosVel(satrecs, julianDate) {
			var satrecsOut = [];
			var positions = [];
			var velocities = [];
			var satnum, max, satrecTmp, jdSat, minutesSinceEpoch, rets, satrec, r, v;
			for (satnum = 0, max = satrecs.length; satnum < max; satnum += 1) {
				satrecTmp = satrecs[satnum];
				jdSat = new JulianDate.fromTotalDays(satrecTmp.jdsatepoch);
				minutesSinceEpoch = jdSat.getMinutesDifference(julianDate);
				rets = sgp4(satrecs[satnum], minutesSinceEpoch);
				satrec = rets.shift();
		r = rets.shift(); // [1802, 3835, 5287] Km, not meters
		v = rets.shift();
		satrecsOut.push(satrec);
		positions.push(r);
		velocities.push(v);
	}
		// UPDATE GLOBAL SO OTHERS CAN USE IT (TODO: make this sane w.r.t. globals)
		satPositions = positions;
		return {'satrecs': satrecsOut,
		'positions': positions,
		'velocities': velocities};
	}

});
