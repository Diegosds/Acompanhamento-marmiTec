window.addEventListener('load', mostrar);
var db = openDatabase("myDB", "3.0", "TiPS Database Example", 2 * 1024 * 1024);




function dataa(){
	
	
	
	 var date = document.getElementById('date').value;
     
	  var ano = date.substring(0, 4);
	  var mes = date.substring(5, 7);
	  var dia= date.substring(8); 
	   
	    var datacerta = dia + "/" + mes + "/" + ano;
		 
		 
		 
 var table = document.getElementById('tbody-registercaixa'); 

    db.transaction(function(tx) {
        tx.executeSql('SELECT * FROM tabelacaixa where data =?  ' , [datacerta], function (tx, resultado) {
            var rows = resultado.rows;
            var tr = '';
            for(var i = 0; i < rows.length; i++){
                    tr += '<tr>';
                    tr += '<td onClick="atualizar(' + rows[i].id + ')">' + rows[i].Pendentes + '</td>';
                    tr += '<td>' + rows[i].Finalizados + '</td>';
					tr += '<td>' + rows[i].Total + '</td>';
				  
                   tr += '<td>' + rows[i].Data + '</td>';
                    tr += '</tr>';                   
            }
                table.innerHTML = tr; 

        }, null);
    });		



		
		 
		 }



function mostrar(){ 




   
    var table = document.getElementById('tbody-registercaixa'); 

    db.transaction(function(tx) {
        tx.executeSql('SELECT * FROM tabelacaixa  ' , [], function (tx, resultado) {
            var rows = resultado.rows;
            var tr = '';
            for(var i = 0; i < rows.length; i++){
                    tr += '<tr>';
                    tr += '<td onClick="atualizar(' + rows[i].id + ')">' + rows[i].Pendentes + '</td>';
                    tr += '<td>' + rows[i].Finalizados + '</td>';
					tr += '<td>' + rows[i].Total + '</td>';
				    tr += '<td>' + rows[i].Data + '</td>';
					
                    tr += '</tr>';                   
            }
                table.innerHTML = tr; 

        }, null);
    });
	
	
}
	 function imprimir() {
	 window.print();
	 
	 }

	 
	 
	 
	 // mostrar listagem de clientes 
	
	
	
		 
		 
		 
		 
		 
		 
		 
		 
		 
	 


