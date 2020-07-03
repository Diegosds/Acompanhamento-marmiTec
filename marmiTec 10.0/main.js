window.addEventListener('load',carrega);

function carrega(){
     document.getElementById('field-name').addEventListener('blur', leave);
    document.getElementById('field-pedido').addEventListener('blur', leave);
    document.getElementById('field-quantidade').addEventListener('blur', leave); 
document.getElementById('field-Detalhes').addEventListener('blur', leave); 	
	
}
function leave(){
    if(this.value != ''){
        this.offsetParent.className += " ativo";
    }else{
        this.offsetParent.className = 'box';
    }
}

function inputSHOW(_show){
    if(_show){
        document.getElementById('field-name').offsetParent.className += " ativo";
        document.getElementById('field-pedido').offsetParent.className += " ativo";
        document.getElementById('field-quantidade').offsetParent.className += " ativo";
		 document.getElementById('field-Detalhes').offsetParent.className += " ativo";
		 
        document.getElementById('btn-deletar').style.display = 'block';
    }else{
        
       document.getElementById('field-name').offsetParent.className += " box";
        document.getElementById('field-pedido').offsetParent.className += " box";
        document.getElementById('field-quantidade').offsetParent.className += " box";
		 document.getElementById('field-Detalhes').offsetParent.className += " box";
		
        //document.getElementById('btn-deletar').style.display = 'none';
    }
}
// Limpa campo dos pedidos
function limpaCampo(){
    
    document.getElementById('field-id').value = '';
    document.getElementById('field-name').value = '';
    document.getElementById('field-pedido').value = '';
    document.getElementById('field-quantidade').value = '';
	 document.getElementById('field-Detalhes').value = '';
	
}
// Limpa campo dos pedidos menos o campo nome
function limpaCampoSemNome(){
    
    document.getElementById('field-id').value = '';
      document.getElementById('field-pedido').value = '';
    document.getElementById('field-quantidade').value = '';
	 document.getElementById('field-Detalhes').value = '';
	
}


function limpaCampoCadastroCliente(){
    
    
      document.getElementById('nomeCliente').value = '';
    document.getElementById('cpfCliente').value = '';
	 document.getElementById('numeroCliente').value = '';
	
}
 

	 
	 
	 
	 
	 
 



