class SiteFooter extends HTMLElement {
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
		footer{
	margin-top: 32px;
	background-color: #050505;
	display: grid;
	grid-template-areas:  "title title title title "
												"more support partner apps"
												"sosmed sosmed sosmed sosmed"
												"copyright copyright copyright copyright";
	width: 90%;
  margin: 0 50px;
  justify-items: center;
}



footer h1.f-logo {
	font-size: 18 px;
	font-weight: 700;
	color: #757575;
	grid-area: title;
}
footer ul{
	margin-top:10px;
	padding-inline-start: 0;
}
footer ul li {
	list-style: none;
	color :#757575;
}
li a.f-title{
	font-weight: 700;
}
li .f-more {
	grid-area: more;
	color :#757575;
}
.f-support{
	grid-area: support;
}
.f-partner{
	grid-area: partner;
}
.f-apps{
	grid-area: apps;
}
ul.f-sosmed{
	grid-area: sosmed;
	display: flex;
	width: 30%;
	justify-content: space-between;
	margin: 15px 0;
}
.f-copyright{
	grid-area: copyright;
	color: #f6f5f5;
}
.f-copyright a {
	color: #f6f5f5;
}
footer ul li a {
	font-size: 16px;
	color: #757575;
	text-decoration: none;

}
footer ul li a i {
	font-size: 32px;
	color: #f6f5f5;
}
@media screen and (max-width: 360px){
	footer{
		display:flex;
		flex-direction:column;
	}
	footer ul{
		margin-top:10px;
		padding-inline-start: 0;
	}
	footer ul li a {
		font-size: 10px;
	}
	.f-copyright {
    color: #757575;
    font-size: 12px;
    text-align: center;
    margin-left: -50px;
}

}

		</style>
<footer>
	<h1 class="f-logo">Vilm</h1>
	<ul class="f-more">
		<li class="f-title"><a href="">More from Vilm</a></li>
		<li><a href="">Blog</a></li>
		<li><a href="">Media</a></li>
		<li><a href="">About Us</a></li>
		<li><a href="">Career</a></li>
	</ul>
	<ul class="f-suppot">
			<li class="f-title"><a href="">Support</a></li>
			<li><a href="">Cookie Policy</a></li>
			<li><a href="">Term of Use</a></li>
			<li><a href="">Privacy Policy</a></li>	
	</ul>
	<ul class="f-partner">
		<li class="f-title"><a href="">Friends</a></li>
		<li><a href="">Partnership</a></li>
	</ul>
	<ul class="f-apps">
		<li class="f-title"><a href="">Get Apps</a></li>
		<li><a href="">Android</a></li>
		<li><a href="">iOS</a></li>
	</ul>
	<ul class="f-sosmed">
		<li><a href=""><i class="fa fa-facebook" aria-hidden="true"></i></a></li>
		<li><a href=""><i class="fa fa-youtube-play" aria-hidden="true"></i></a></li>
		<li><a href=""><i class="fa fa-instagram" aria-hidden="true"></i></a></li>
		<li><a href=""><i class="fa fa-twitter" aria-hidden="true"></i></a></li>
	</ul>
	<p class="f-copyright">copyright &copy; Vilm. 2020. All Right Reserved by <a href="https://www.themoviedb.org">TheMoviDB</a></p>
</footer>
		`
	}



}
window.customElements.define('site-footer', SiteFooter);

export default SiteFooter;