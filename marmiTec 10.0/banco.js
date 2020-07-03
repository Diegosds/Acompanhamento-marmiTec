window.addEventListener('load', carregado);

var db = openDatabase("myDB", "3.0", "marmitec", 2 * 1024 * 1024);
// setando os valores de data e horario para deixar global para tas as funções utilizarem
  

// Salvando Cliente no Banco de dados 

  var data = new Date();
    var dia = data.getDate();
	var mess = data.getMonth();
	var mes = mess + 1;
	var ano = data.getFullYear();
	if (mes < 10 ){
		var mes = "0" + mes;
	}if (dia < 10){
		var dia = "0" + dia;
	}
       var dataa = dia + "/" + mes + "/" + ano;	
	
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
	document.getElementById('idcaixadodia').addEventListener('click',caixa);
	
	document.getElementById('registrarCaixa').addEventListener('click',salvarcaixa);
	document.getElementById('llll').addEventListener('click',limpaCampoCadastroCliente);
	
	
    db.transaction(function(tx) {
      // tx.executeSql("DROP TABLE tabelapedido" );
      tx.executeSql("CREATE TABLE IF NOT EXISTS tabelapedido ( id INTEGER PRIMARY KEY,nome TEXT,carne TEXT, quantidade TEXT, detalhes TEXT, situacao TEXT, horario TEXT, data TEXT, valor TEXT)");
 
        tx.executeSql("CREATE TABLE IF NOT EXISTS tabelacliente ( id INTEGER PRIMARY KEY ,nome TEXT,cpf INT, Numero INT)");
		
		tx.executeSql("CREATE TABLE IF NOT EXISTS tabelacaixa ( id INTEGER PRIMARY KEY , Pendentes TEXT,Finalizados TEXT, Total TEXT,Data Text)");
		
	
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
		 
		 //setando a tada do pedido
	
  
	
	// Setando o horario do pedido 
	 var datasa = new Date();
	var hora = datasa.getHours();
	var minutos = datasa.getMinutes();
	var HorarioPedido = hora + ":" + minutos;
	
	
	
	
	
    var id = document.getElementById('field-id').value;
    var nome = document.getElementById('field-name').value;
    var carn = document.getElementById('field-pedido').value;
    var quant = document.getElementById('field-quantidade').value;
    var det = document.getElementById('field-Detalhes').value;
	 var sit = "Pendente";
	  var hor = HorarioPedido;
      var dat = dataa;
	  var val = 15;
	  var totalval = quant * val;
var caixadia = 0;
var caixadiaa = totalval + caixadia ;
if ( caixadiaa > 0){
	
	
	var caixadiaa = caixadiaa + totalval;
	
	
}else {
	var caixadia = 0;
	
}

	 
	 if (nome == "" || carn == "" || quant == "" || det == "" ){
		 
		 alert("Por favor prencha todos os campos");
		
		
		 
		  
		 
	 }else  {

    db.transaction(function(tx) {
        if(id){
            tx.executeSql('UPDATE tabelapedido SET nome=?, carne=?, quantidade=?, detalhes=?, situacao=?, data=?, valor=? WHERE id=?', [nome,carn,quant,det,sit,dat,totalval,id],null);
        }else{
            tx.executeSql('INSERT INTO tabelapedido ( nome,carne,quantidade,detalhes,situacao,horario,data,valor) VALUES (?, ?, ?, ?, ?,?,?,?)', [nome,carn,quant,det,sit,hor,dat,totalval]);
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
        tx.executeSql('SELECT * FROM tabelapedido where data=? ' , [dataa], function (tx, resultado) {
            var rows = resultado.rows;
            var tr = '';
            for(var i = 0; i < rows.length; i++){
                    tr += '<tr>';
                    tr += '<td onClick="atualizar(' + rows[i].id + ')">' + rows[i].nome + '</td>';
                    tr += '<td>' + rows[i].carne + '</td>';
					tr += '<td>' + rows[i].quantidade + '</td>';
				
					tr += '<td>' + rows[i].situacao + '</td>';
					tr += '<td>' + rows[i].horario + '</td>';
                    tr += '<td>' + rows[i].valor + '</td>';
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
    var carn = document.getElementById('field-pedido');
    var quant = document.getElementById('field-quantidade');
	 var det = document.getElementById('field-Detalhes');
	
    
    id.value = _id;
    
    db.transaction(function(tx) {
        tx.executeSql('SELECT * FROM tabelapedido WHERE id=?', [_id], function (tx, resultado) {
            var rows = resultado.rows[0];

            nome.value = rows.nome ;
            carn.value = rows.carne ;
            quant.value = rows.quantidade ;
			det.value = rows.detalhes ;
			var detalhemostrar = rows.detalhes ;
			document.getElementById("detalhepedi").innerHTML = detalhemostrar;
			
			
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


// calculo do caixa do dia

function caixa (){
		
		
		 var caixadiaa = document.getElementById("caixadia");
		 var caixafinalizados = document.getElementById("caixafinalizados");
		 var caixaipendentes = document.getElementById("caixapendentes");
		
		 db.transaction(function(tx) {
        
            tx.executeSql('select SUM(valor) AS valortotalcaixa from tabelapedido where data =? ',[dataa], function(tx,resultado){
		var rows = resultado.rows;
              var tr = 0;
			    
                 
                   tr +=  rows[0].valortotalcaixa ;
					
                    trrrr = tr + "R$";    
			     
			
			caixadiaa.innerHTML=trrrr;
			
			
			
			},null);
		 
		 
		 });
		 
		 // caixa dos finalizados 
		 db.transaction(function(tx) {
        
            tx.executeSql('select SUM(valor) AS valorfinalizadoscaixa from tabelapedido where situacao = "Finalizado" and data =? ',[dataa], function(tx,resultado){
		var rows = resultado.rows;
              var tr = 0;
			    
                 
                   tr +=  rows[0].valorfinalizadoscaixa ;
					
                       
			       trrr = tr + "R$";
			
			caixafinalizados.innerHTML=trrr;
			
			
			
			},null);
		 
		 
		 });
		 
		 // caixa pendentes 
		 
		 
		  db.transaction(function(tx) {
        
            tx.executeSql('select SUM(valor) AS valorpendentescaixa from tabelapedido where situacao = "Pendente" and data =? ',[dataa], function(tx,resultado){
		var rows = resultado.rows;
              var tr = 0;
			    
                 
                   tr +=  rows[0].valorpendentescaixa ;
					
                       
			      trr = tr + " R$"
			
			caixapendentes.innerHTML=trr;
			
			 
			
			},null);
		 
		 
		 });
		 
		 
		
}

function salvarcaixa (){
	
	
	
	
	
	
	db.transaction(function(tx) {
        
            tx.executeSql('INSERT INTO tabelacaixa ( Pendentes,Finalizados,Total,Data) VALUES (?, ?, ?,?)', [trr,trrr,trrrr,dataa]);
	},null);
	
	
	alert("Caixa Salvo Com Sucesso")
	
	
}