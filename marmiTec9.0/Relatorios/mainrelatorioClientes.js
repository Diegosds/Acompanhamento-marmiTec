window.addEventListener('load', mostrar);
var db = openDatabase("myDB", "3.0", "TiPS Database Example", 2 * 1024 * 1024);




function mostrar(){ 




   
    var table = document.getElementById('tbody-registerClientes'); 

    db.transaction(function(tx) {
        tx.executeSql('SELECT * FROM tabelacliente  ' , [], function (tx, resultado) {
            var rows = resultado.rows;
            var tr = '';
            for(var i = 0; i < rows.length; i++){
                    tr += '<tr>';
                    tr += '<td onClick="atualizar(' + rows[i].id + ')">' + rows[i].nome + '</td>';
                    tr += '<td>' + rows[i].cpf + '</td>';
					tr += '<td>' + rows[i].Numero + '</td>';
				   
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
	
	
	
		 
		 
		 
		 
		 
		 
		 
		 
		 
	 


