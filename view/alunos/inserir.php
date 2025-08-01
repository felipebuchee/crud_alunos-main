<?php 

if(isset($_POST['nome'])){
    $nome = $_POST['nome']; 
    $idade = $_POST['idade'];
    $estrangeiro = $_POST['estrangeiro'];
    $id_curso = $_POST['id_curso'];
}

$aluno = new Aluno();
$aluno->setNome($nome);
$aluno->setIdade($idade);
$aluno->setEstrangeiro($estrangeiro);
$aluno->setCurso($cursoCont->buscarPorId($id_curso));

$alunoDAO = new AlunoDAO();
if($alunoDAO->inserir($aluno)){
    header("Location: listar.php");
    exit;
} else {
    $erro = "Erro ao inserir aluno.";
}


include_once (__DIR__ . '/form.php');
?>