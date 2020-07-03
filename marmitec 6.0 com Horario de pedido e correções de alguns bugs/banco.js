window.addEventListener('load', carregado);

var db = openDatabase("myDB", "3.0", "TiPS Database Example", 2 * 1024 * 1024);
Dia ();



// Salvando Cliente no Banco de dados 


function salvarCliente(){
	
    var idc = document.getElementById('field-id').value;
    var nomec = document.getElementById('nomeCliente').value;
    var cpfc = document.getElementById('cpfCliente').value;
    var numeroc = document.getElementById('numeroCliente').value;
 
	

	 if (nomec == "" || cpfc == "" || numeroc == "" ){
		 
		 alert("Por favor prencha todos os campos");
		
		 
		 
	 }else  {

    db.transaction(function(tx) {
        if(idc){
            tx.executeSql('UPDATE tabelacliente SET nome=?, cpf=?, Numero=?, WHERE id=?', [nomec,cpfc,numeroc,idc],null);
        }else{
            tx.executeSql('INSERT INTO tabelacliente ( nome,cpf,Numero) VALUES ( ?, ?, ?)', [nomec,cpfc,numeroc]);
        }
    });

     alert("Cliente salvo com sucesso");
   
	 }
}









function carregado(){  
     document.getElementById('btn btn-primaryy').addEventListener('click', mostrarCliente);
    document.getElementById('btn btn-primary').addEventListener('click', salvarCliente);
    document.getElementById('btn-salvar').addEventListener('click', salvar);
    document.getElementById('btn-deletar').addEventListener('click', deletar);
	document.getElementById('btn-finalizar').addEventListener('click', finalizar);
	document.getElementById('lll').addEventListener('click',mostrarCliente, LimpaTabelaCliente);
    document.getElementById('BotaoCadastro').addEventListener('click',limpaCampoSemNome);
	
	
	
	
    db.transaction(function(tx) {
       //tx.executeSql("DROP TABLE tabelapedido" );
      tx.executeSql("CREATE TABLE IF NOT EXISTS tabelapedido ( id INTEGER PRIMARY KEY,nome TEXT,pedido TEXT, quantidade TEXT, detalhes TEXT, situacao TEXT, horario TEXT)");
 
        tx.executeSql("CREATE TABLE IF NOT EXISTS tabelacliente ( id INTEGER PRIMARY KEY ,nome TEXT,cpf INT, Numero INT)");
		
	
   // tx.executeSql('INSERT INTO tabelapedido ( nome,pedido,quantidade,detalhes,situacao) VALUES ("a", "b", "c", "d", "e")');
    });
    
    mostrar();
	
    
}   
function LimpaTabelaCliente (){
	
	
	var nomepcliente = ""; 
}
//salvando os dados digitados nas variaveis
function salvar(){
	//definindo a data e hora para salvar
		 var data = new Date();
	var dia = data.getDate();
	var hora = data.getHours();
	var minutos = data.getMinutes();
	var HorarioPedido = hora + ":" + minutos;
	
	
	
	
	
    var id = document.getElementById('field-id').value;
    var nome = document.getElementById('field-name').value;
    var ped = document.getElementById('field-pedido').value;
    var quant = document.getElementById('field-quantidade').value;
    var det = document.getElementById('field-Detalhes').value;
	 var sit = "Pendente";
	  var hor = HorarioPedido;

	
	
	 
	 if (nome == "" || ped == "" || quant == "" || det == "" ){
		 
		 alert("Por favor prencha todos os campos");
		
		 
		 
	 }else  {

    db.transaction(function(tx) {
        if(id){
            tx.executeSql('UPDATE tabelapedido SET nome=?, pedido=?, quantidade=?, detalhes=?, situacao=?, horario=? WHERE id=?', [nome,ped,quant,det,sit,hor,id],null);
        }else{
            tx.executeSql('INSERT INTO tabelapedido ( nome,pedido,quantidade,detalhes,situacao,horario) VALUES (?, ?, ?, ?, ?, ?)', [nome,ped,quant,det,sit,hor]);
        }
    });

    mostrar();
    limpaCampo();
    inputSHOW(false);
	 }
}

// Listando todos os clientes na modal de pesquisa de cliente
function mostrarCliente(){  

var table2 = document.getElementById('tbody-registerr');
 var nomepcliente = document.getElementById('pesquisarCliente').value;

// Caixa de pesquisa do cliente por nome
if (nomepcliente == ""){
	table2.innerHTML = "";
	
	
} else {
 db.transaction(function(txx) {
txx.executeSql('SELECT nome,id FROM tabelacliente where nome LIKE "' + nomepcliente +'%" ', [], function (txx, resultado) {



 var rows = resultado.rows;
var tr = '';

for(var i = 0; i < rows.length; i++){
 tr += '<tr>';
 tr += '<td onClick="atualizarr(' + rows[i].id + ')">' + rows[i].nome + '</td>';
tr += '</tr>'; 
}

table2.innerHTML = tr;


}, null);
    });
	document.getElementById('pesquisarCliente').value = '';

	 // document.getElementById('field-name').value = '';
}

}
//Mostrando os dados do banco na tabela
function mostrar(){        
    var table = document.getElementById('tbody-register');

    db.transaction(function(tx) {
        tx.executeSql('SELECT * FROM tabelapedido', [], function (tx, resultado) {
            var rows = resultado.rows;
            var tr = '';
            for(var i = 0; i < rows.length; i++){
                    tr += '<tr>';
                    tr += '<td onClick="atualizar(' + rows[i].id + ')">' + rows[i].nome + '</td>';
                    tr += '<td>' + rows[i].pedido + '</td>';
					tr += '<td>' + rows[i].quantidade + '</td>';
					tr += '<td>' + rows[i].detalhes + '</td>';
					tr += '<td>' + rows[i].situacao + '</td>';
					tr += '<td>' + rows[i].horario + '</td>';
                   
                    tr += '</tr>';                   
            }
                table.innerHTML = tr; 

        }, null);
    });
}
//atualizando os campo nome de pedido de acordo com o clique na tabela
function atualizarr(_id){   

 var id = document.getElementById('field-id');
 var nome = document.getElementById('field-name');
id.value = _id;
db.transaction(function(tx) {
	
        tx.executeSql('SELECT * FROM tabelacliente WHERE id=?', [_id], function (tx, resultado) {
            var socorro = resultado ;
			var rows = resultado.rows[0];

            nome.value = rows.nome ;
           document.getElementById('field-id').value = ''; // limpando campo para nao bugar
			
        });

 });
    inputSHOW(true);

}

// atualizando os campos de cadastro de pedido de acordo com o clique na tabela
function atualizar(_id){   
    
    var id = document.getElementById('field-id');
    var nome = document.getElementById('field-name');
    var ped = document.getElementById('field-pedido');
    var quant = document.getElementById('field-quantidade');
	 var det = document.getElementById('field-Detalhes');
	
    
    id.value = _id;
    
    db.transaction(function(tx) {
        tx.executeSql('SELECT * FROM tabelapedido WHERE id=?', [_id], function (tx, resultado) {
            var rows = resultado.rows[0];

            nome.value = rows.nome ;
            ped.value = rows.pedido ;
            quant.value = rows.quantidade ;
			det.value = rows.detalhes ;
			
        });
    });
    inputSHOW(true);
}
// deletando do banco e da tabela de acordo com id clicado
function deletar(){
    
	var id = document.getElementById('field-id').value;
	var r=confirm("Deseja Deletar este Pedido?");
	
	if (r==true){
	
	 db.transaction(function(tx) {
        tx.executeSql("DELETE FROM tabelapedido WHERE id=?", [id]);
    });
    
    mostrar();
    limpaCampo();
    inputSHOW(false);
	}else
		
	 mostrar();
    limpaCampo();
	
}
// Mudando o estado do pedido na telabela de pendente para finalizado
function finalizar (){

		
	

	  var id = document.getElementById('field-id').value;
	var r=confirm("Deseja Finalizar este Pedido?");
	if (r==true){
	

	 db.transaction(function(tx) {
        
           tx.executeSql("UPDATE tabelapedido SET  situacao='Finalizado' WHERE id=?", [id]);
		 
		   mostrar();
    });
	}else
		
	mostrar();
	
	
}