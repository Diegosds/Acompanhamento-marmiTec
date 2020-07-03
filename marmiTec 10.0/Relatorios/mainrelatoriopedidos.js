window.addEventListener('load', mostrar);
var db = openDatabase("myDB", "3.0", "TiPS Database Example", 2 * 1024 * 1024);




function dataa(){
	
	
	
	 var date = document.getElementById('date').value;
     
	  var ano = date.substring(0, 4);
	  var mes = date.substring(5, 7);
	  var dia= date.substring(8); 
	   
	    var datacerta = dia + "/" + mes + "/" + ano;
		
		 
		 
 var table = document.getElementById('tbody-registerpedidos'); 

    db.transaction(function(tx) {
        tx.executeSql('SELECT * FROM tabelapedido where data =?  ' , [datacerta], function (tx, resultado) {
            var rows = resultado.rows;
            var tr = '';
            for(var i = 0; i < rows.length; i++){
                    tr += '<tr>';
                    tr += '<td onClick="atualizar(' + rows[i].id + ')">' + rows[i].nome + '</td>';
                    tr += '<td>' + rows[i].carne + '</td>';
					tr += '<td>' + rows[i].quantidade + '</td>';
				    tr += '<td>' + rows[i].detalhes + '</td>';
					tr += '<td>' + rows[i].situacao + '</td>';
					tr += '<td>' + rows[i].horario + '</td>';
					tr += '<td>' + rows[i].data + '</td>';
                    tr += '<td>' + rows[i].valor + '</td>';
                    tr += '</tr>';                   
            }
                table.innerHTML = tr; 

        }, null);
    });		



		
		 
		 }



function mostrar(){ 




   
    var table = document.getElementById('tbody-registerpedidos'); 

    db.transaction(function(tx) {
        tx.executeSql('SELECT * FROM tabelapedido  ' , [], function (tx, resultado) {
            var rows = resultado.rows;
            var tr = '';
            for(var i = 0; i < rows.length; i++){
                    tr += '<tr>';
                    tr += '<td onClick="atualizar(' + rows[i].id + ')">' + rows[i].nome + '</td>';
                    tr += '<td>' + rows[i].carne + '</td>';
					tr += '<td>' + rows[i].quantidade + '</td>';
				    tr += '<td>' + rows[i].detalhes + '</td>';
					tr += '<td>' + rows[i].situacao + '</td>';
					tr += '<td>' + rows[i].horario + '</td>';
					tr += '<td>' + rows[i].data + '</td>';
                    tr += '<td>' + rows[i].valor + '</td>';
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
	
	
	
		 
		 
		 
		 
		 
		 
		 
		 
		 
	 


