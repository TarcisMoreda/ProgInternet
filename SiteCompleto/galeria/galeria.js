const modal = document.getElementById('modal');
const images = document.querySelectorAll('.image img');
const full_img = document.getElementById('full-img');
const caption = document.getElementById('caption');

images.forEach(image=>{
	image.addEventListener('click', ()=>{
		modal.classList.add('open');
		full_img.classList.add('open');
		full_img.src = image.src;
		caption.innerHTML = image.alt;
	});
});
modal.addEventListener('click', ()=>{
	modal.classList.remove('open');
	full_img.classList.remove('open');
});