<?php 

    require_once(__DIR__ . "/../../controller/AlunoController.php");

    $alunoCont = new AlunoController();

    $lista = $alunoCont->listar();

    //print_r($lista);

    include_once __DIR__ . '/../include/header.php';
?>

<h1>Listagem de Alunos</h1>

<div class="actions">
    <a href="inserir.php" class="btn btn-primary">+ Inserir Novo Aluno</a>
</div>

<div class="table-container">
    <?php if (empty($lista)) : ?>
        <div class="empty-state">
            <h3>Nenhum aluno encontrado</h3>
            <p>Ainda não há alunos cadastrados no sistema.</p>
            <a href="inserir.php" class="btn btn-primary">Cadastrar Primeiro Aluno</a>
        </div>
    <?php else : ?>
    <table>
        <thead>
            <tr>
                <th class="id-column">ID</th>
                <th class="name-column">Nome</th>
                <th class="age-column">Idade</th>
                <th class="foreign-column">Estrangeiro</th>
                <th class="course-column">Curso</th>
                <th class="actions-column">Editar</th>
                <th class="actions-column">Excluir</th>
            </tr>
        </thead>
        <tbody>

    <?php foreach ($lista as $aluno) : ?>
        <tr>
            <td class="id-column"><?= $aluno->getId() ?></td>
            <td class="name-column"><?= $aluno->getNome() ?></td>
            <td class="age-column"><?= $aluno->getIdade() ?> anos</td>
            <td class="foreign-column">
                <?php if ($aluno->getEstrangeiro() === 'S') : ?>
                    <span class="badge badge-info">Sim</span>
                <?php else : ?>
                    <span class="badge badge-success">Não</span>
                <?php endif; ?>
            </td>
            <td class="course-column"><?= $aluno->getCurso()->getNome() ?></td>
            <td class="actions-column">
                <a href="editar.php?id=<?= $aluno->getId() ?>" class="btn btn-warning btn-sm">
                    <img src="../../img/btn_editar.png" alt="Editar" class="action-icon">
                </a>
            </td>
            <td class="actions-column">
                <a href="excluir.php?id=<?= $aluno->getId() ?>" class="btn btn-danger btn-sm" 
                   onclick="return confirm('Tem certeza que deseja excluir este aluno?')">
                    <img src="../../img/btn_excluir.png" alt="Excluir" class="action-icon">
                </a>
            </td>
        </tr>
    <?php endforeach; ?>
        </tbody>
    </table>
    <?php endif; ?>
</div>



<?php
    include_once __DIR__ . '/../include/footer.php';
?>

