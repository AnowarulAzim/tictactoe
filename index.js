let val = ['black','#99ffcc']
let docs = ['x.png','o.png']
let i = 0;
let k = 0;
let finish=0;
let visited = { 'image1':0,
				'image2':0,
				'image3':0,
				'image4':0,
				'image5':0,
				'image6':0,
				'image7':0,
				'image8':0,
				'image9':0
			}
function change_bg() {

	const body=document.querySelector('body')
	// console.log(i);
	body.style.backgroundColor = val[i%2];
	i=i+1;
	// const body = document.getElementsByTagName('body');
	// console.log(body)
	// console.log()
}

function update(imageID) {
	var im=document.getElementById(imageID.id)
	// console.log(imageID);
	im.src = docs[k%2];
	k=k+1;
	if(!visited[imageID.id]) visited[imageID.id]=1;

	for (var key in visited) {
    finish = finish + visited[key];
    // console.log(finish,visited[key])
}
	// console.log(finish)
	if(finish==9) {
		console.log("finished")
		document.getElementById("finish").innerHTML = "GAME FINISHED";
	}
	finish = 0;
}