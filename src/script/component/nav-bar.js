class NavBar extends HTMLElement {
	constructor() {
		super();
		this.shadowDOM = this.attachShadow({mode:"open"})
	}
	connectedCallback(){
		this.render();
	}
	render(){
		this.shadowDOM.innerHTML = `
		<style>
		nav {
			display: flex;
			justify-content: flex-start;
			width: 100%;
			height: 70px;
			align-items: center;
			background: transparent;
			background: rgba(0,0,0,0.3);
			z-index:9;
		}
		nav h1 {
    width: 90%;
    margin-left: 50px;
    font-size:32px;
    color:#ffa500	;
		}
		nav a {
			text-decoration: none;
			white-space:nowrap;

		}
		@media screen and (max-width: 360px){
			nav h1 {
				font-size:24px;
}
		}

		</style>
		<nav>
		<h1 id="logo">Vilm</h1>
		
		</nav>

		`
	}
}
window.customElements.define('nav-bar', NavBar);