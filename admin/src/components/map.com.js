import React, { Component } from "react";
import configs from "../configs";
import ReactMapGL, {
	GeolocateControl,
	Marker,
	NavigationControl
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import ServiceProvider from "../utils/service_provider.utils";

class Map extends Component {
	state = {
		viewport: {
			width: "100%",
			height: 400,
			latitude: 37.7577,
			longitude: -122.4376,
			zoom: 16
		},
		markers: [],
		user_location: [],
		is_loading: true
	};

	async componentDidMount() {
		const response = await ServiceProvider.GET("/settings");
		if(response.data.location_coordinates.length>0){
			this.setState({markers:response.data.location_coordinates});
		}
		this.GetCurrentLocation();
	}

	GetCurrentLocation(){
		navigator.geolocation.getCurrentPosition(position => {
			this.setState(prevState => ({
				viewport: {
					...prevState.viewport,
					latitude: position.coords.latitude,
					longitude: position.coords.longitude
				},
				user_location: [
					position.coords.latitude,
					position.coords.longitude
				],
				is_loading: false
			}));
		});
	}

	GetCoordinatesLocation(){
		if(this.state.markers.length>0){
			this.setState(prevState => ({
				viewport: {
					...prevState.viewport,
					latitude: this.state.markers[0].latitude,
					longitude: this.state.markers[0].longitude
				}}))
		}
	}

	AddMarker(event) {
		this.setState({
			markers: [
				...this.state.markers,
				{ longitude: event.lngLat[0], latitude: event.lngLat[1] }
			]
		});
		console.log(this.state.markers);
	}

	ResetMakers() {
		this.setState({ markers: [] });
	}

	async UpdateCoordinates(){
		ServiceProvider.POST("/settings",{"location_coordinates":this.state.markers});
	}

	render() {
		return (
			<div>
				<section className="content-header">
					<h1>Map</h1>
				</section>
				<section className="content" >
					<div className="row" >
						<div className="col-md-12">
							{!this.state.is_loading && (
								<ReactMapGL
									{...this.state.viewport}
									mapboxApiAccessToken={
										configs.mapbox.accessToken
									}
									onViewportChange={viewport =>
										this.setState({ viewport })
									}
									onClick={event => {
										this.AddMarker(event);
									}}
								>
									<div
										style={{
											position: "absolute",
											right: 0
										}}
									>
										<NavigationControl />
									</div>
									<Marker
										latitude={this.state.user_location[0]}
										longitude={this.state.user_location[1]}
									>
										<span>
											<i
												className="fa fa-user primary"
												style={{ color: "blue" }}
											></i>
										</span>
									</Marker>
									{this.state.markers.map(marker => {
										return (
											<Marker
												key={marker.latitude + marker.longitude}
												latitude={marker.latitude}
												longitude={marker.longitude}
											>
												<span>
													<i
														className="fa fa-close"
														style={{
															color: "black"
														}}
													></i>
												</span>
											</Marker>
										);
									})}
								</ReactMapGL>
							)}
						</div>
					</div>
					<div className="row">
						<div className="col-md-12" style={{paddingTop:"10px"}}>
							<button
								style={{marginRight:"10px"}}
								className="btn btn-primary"
								onClick={() => {
									this.ResetMakers();
								}}
							>
								Reset Markers
							</button>
							<button
							style={{marginRight:"10px"}}
								className="btn btn-primary"
								onClick={() => {
									this.GetCurrentLocation();
								}}
							>
								Estimited Current Location
							</button>
							<button
							style={{marginRight:"10px"}}
								className="btn btn-primary"
								onClick={() => {
									this.GetCoordinatesLocation();
								}}
							>
								Coordinates Location
							</button>
							<button
							style={{marginRight:"10px"}}
								className="btn btn-primary"
								onClick={() => {
									this.UpdateCoordinates();
								}}
							>
								Submit
							</button>
						</div>
					</div>
				</section>
			</div>
		);
	}
}

export default Map;
