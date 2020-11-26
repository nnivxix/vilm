class SiteHero extends HTMLElement {
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
		.hero{
	width: 100%;
	min-height: 100vh;
	color: #eee;
	background: #050505;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.hero p{
	font-size: 40px;
	font-weight: 700;
	text-align: center;
	width: 50%;
	color: #eee;
}
form {
	display: flex;
	justify-content: center;
	width: 50%;
}
form input.mail{
		background-color: #050505;
	  width: 50%;
    padding: 10px;
    border-width: 0 0 3px 0;
}
form input.submit{
	  width: 20%;
	  background: #ffa500;
    color: #eee;
    border: none;
}
		@media screen and (max-width: 360px){
	.hero p{
		font-size: 24px;
		width: 80%;
	}
	form{
		width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
	}
	form input.submit {
    margin-top: 15px;
    padding: 10px 5px;
    width: 50%;
  }
  form input.mail {
    width: 50%;
    padding: 10px;
    border-width: 0 0 3px 0;
  }
}
		}

		</style>
		<div class="hero">
		<p>Dapatkan Info terbaru film hanya di Vilm</p>
		<form>
			<input type="email" class="mail" placeholder="yourmail@mail.com">
			<input type="submit" class="submit"name="Dapatkan Info">
		</form>
</div>
				`
	}
}
window.customElements.define('site-hero', SiteHero);