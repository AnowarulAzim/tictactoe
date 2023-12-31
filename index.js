let val = ['white','#666666']
let docs = ['x.png','o.png']
let i = 0;
let k = 0;
let finish=0;
let result=0;
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
let visited_color = { 'image1':0,
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
	i=i+1;
	body.style.backgroundColor = val[i%2];
	document.getElementById("finish").style.color=val[(i+1)%2];
}

function check_win(array){
	if( (array['image1']==6 && array['image2']==6 && array['image3']==6) ||
	    (array['image4']==6 && array['image5']==6 && array['image6']==6) ||
	    (array['image7']==6 && array['image8']==6 && array['image9']==6) ||
	    (array['image1']==6 && array['image4']==6 && array['image7']==6) ||
	    (array['image2']==6 && array['image5']==6 && array['image8']==6) ||
	    (array['image3']==6 && array['image6']==6 && array['image9']==6) ||
	    (array['image1']==6 && array['image5']==6 && array['image9']==6) ||
	    (array['image3']==6 && array['image5']==6 && array['image7']==6) )
	{
		return 2;
	}
	else if( (array['image1']==5 && array['image2']==5 && array['image3']==5) ||
	    (array['image4']==5 && array['image5']==5 && array['image6']==5) ||
	    (array['image7']==5 && array['image8']==5 && array['image9']==5) ||
	    (array['image1']==5 && array['image4']==5 && array['image7']==5) ||
	    (array['image2']==5 && array['image5']==5 && array['image8']==5) ||
	    (array['image3']==5 && array['image6']==5 && array['image9']==5) ||
	    (array['image1']==5 && array['image5']==5 && array['image9']==5) ||
	    (array['image3']==5 && array['image5']==5 && array['image7']==5) )
	{
		return 3;
	}
	else return 0;

}

function update(imageID) {
	var im=document.getElementById(imageID.id)
	if(k<9 && result==0) im.src = docs[k%2];
	k=k+1;
	if(!visited[imageID.id]) {
		visited[imageID.id]=1;
		visited_color[imageID.id]=(k%2)+5;
	}
	result = check_win(visited_color)
	for (var key in visited) {
    	finish = finish + visited[key];
    }
    
	if(k<9 && result==0) document.getElementById("next_move").src = docs[k%2];
	

	if(finish==9 || result==2 || result ==3) {
		if(result==2) document.getElementById("finish").innerHTML = "GAME FINISHED <br> KATA wins";
		else if(result==3) document.getElementById("finish").innerHTML = "GAME FINISHED <br> GOLLA wins";
		else document.getElementById("finish").innerHTML = "GAME FINISHED <br> Game DRAW!!";

	}
	finish = 0;

}