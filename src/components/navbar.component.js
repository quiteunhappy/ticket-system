import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
	const Logout = () => {
		window.sessionStorage.removeItem("token");
        window.location.reload();
	}

	return (
		<nav className="navbar navbar-light bg-light navbar-expand-lg ml-auto">
			<div className="container-fluid">
				<button className="btn btn-dark d-inline-block d-lg-none ml-auto" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<i className="fas fa-align-justify"></i>
				</button>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav ml-auto">
						<li>
							<Link to="/" className="nav-link" onClick={ Logout }>Sign Out</Link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
}
