$(function(){
	function WordBook(data){
		var self=this;
		this.container=$('#container');
		this.el={
			nav:$('<ul></ul>',{class:'nav clearfix'}).appendTo(self.container),
			content:$('<div></div>',{class:'content clearfix'}).hide().appendTo(self.container)
		};
		this.data=data;
		this.statistics={};
		this.focus=undefined;
		this.animationEnd=!0;
		this.create={
			description:function(oDescription){
				var $li=$('<li></li>',{class:'fl'}),
					$img=$('<div></div>',{class:'img'}).appendTo($li);
				$('<img src="lib/images/'+oDescription.image+'" alt="" />').appendTo($img);
				$('<p></p>').html(oDescription.description).appendTo($li);
				$li.on('click',function(){
					if(self.focus!==oDescription.description){
						self.focus=oDescription.description;
						self.el.content.hide();
						self.el.content.html('');
						oDescription.words.forEach(function(oWord){
							self.create.word(oWord).appendTo(self.el.content);
						});
					}
					self.el.content.stop(true).slideToggle(500);
				}).appendTo(self.el.nav);
				return this;
			},
			word:function(oWord){
				var $word=$('<div></div>',{class:'word fl'});
				$('<p></p>').html(oWord.en+' : '+oWord.ch).appendTo($word);
				if(oWord.relationship){
					var sRelationship='';
					$word.addClass('relationship');
					oWord.relationship.forEach(function(oRelationship,index){
						index!==0&&(sRelationship+='&nbsp;&nbsp;&nbsp;');
						sRelationship+=oRelationship.en+' : '+oRelationship.ch;
					});
					$('<p></p>').html(sRelationship).appendTo($word);
				}
				return $word;
			}
		};
		this.init=function(){
			console.log(this.data);
			this.data.forEach(function(oDescription){
				self.create.description(oDescription);
			});
			return this;
		};
		return this.init();
	}
	new WordBook(data);
});