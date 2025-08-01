<?php 

require_once(__DIR__ . "/../util/Connection.php");
require_once(__DIR__ . "/../model/Aluno.php");

class AlunoDAO{

    private PDO $conexao;

    public function __construct(){
        $this->conexao = Connection::getConnection();
    }
    
    public function listar(){
        $sql = "SELECT a.*,
            c.nome nome_curso, c.turno turno_curso
            FROM alunos a
                JOIN cursos c ON a.id_curso = c.id";
        $stm = $this->conexao->prepare($sql);
        $stm->execute();
        $result = $stm->fetchAll();

        return $this->map($result);
    }

    public function inserir(Aluno $aluno){
        $sql = "INSERT INTO alunos (nome, idade, estrangeiro, id_curso) 
                VALUES (:nome, :idade, :estrangeiro, :id_curso)";
        $stm = $this->conexao->prepare($sql);
        $stm->bindValue(':nome', $aluno->getNome());
        $stm->bindValue(':idade', $aluno->getIdade());
        $stm->bindValue(':estrangeiro', $aluno->getEstrangeiro());
        $stm->bindValue(':id_curso', $aluno->getCurso()->getId());

        return $stm->execute();
    }

    private function map(array $result){
        $alunos = [];
        foreach($result as $r){
            $aluno = new Aluno();
            $aluno->setId($r["id"]);
            $aluno->setNome($r["nome"]);
            $aluno->setIdade($r["idade"]);
            $aluno->setEstrangeiro($r["estrangeiro"]);
            
            $curso = new Curso();
            $curso->setId($r["id_curso"]);
            $curso->setNome($r["nome_curso"]);
            $curso->setTurno($r["turno_curso"]);
            $aluno->setCurso($curso);


            array_push($alunos, $aluno);
        }
        return $alunos;
    }
}