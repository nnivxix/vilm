class TopHero extends HTMLElement {

	connectedCallback(){
		this.render();
	}
	render(){
		this.innerHTML = `
		<h1>hello world</h1>
		`
	}



}
window.customElements.define('top-hero', TopHero);

export default TopHero;
