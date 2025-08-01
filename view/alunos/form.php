<?php
require_once(__DIR__ . '/../../controller/CursoController.php');

try {
    $cursoCont = new CursoController();
    $cursos = $cursoCont->listar();
} catch (Exception $e) {
    $cursos = [];
    $erro_cursos = "Erro ao carregar cursos: " . $e->getMessage();
}

include_once __DIR__ . '/../include/header.php';
?>

<h1>Cadastrar Novo Aluno</h1>

<?php if (isset($erro_cursos)) : ?>
    <div class="alert alert-danger">
        <?= htmlspecialchars($erro_cursos) ?>
    </div>
<?php endif; ?>

<div class="form-container">
    <div class="form-wrapper">
        <form action="#" method="POST" id="alunoForm">

            <div class="form-group">
                <label for="nome" class="required">Nome Completo</label>
                <input type="text"
                    id="nome"
                    name="nome"
                    class="form-control"
                    placeholder="Digite o nome do aluno"
                    required>
            </div>

            <div class="form-group">
                <label for="idade" class="required">Idade</label>
                <input type="number"
                    id="idade"
                    name="idade"
                    class="form-control"
                    placeholder="Digite a idade"
                    min="14"
                    max="100"
                    required>
            </div>

            <div class="form-group">
                <label class="required">É estrangeiro?</label>
                <div class="radio-group">
                    <div class="form-check">
                        <input type="radio"
                            id="estrangeiro_nao"
                            name="estrangeiro"
                            value="N"
                            class="form-check-input"
                            checked>
                        <label for="estrangeiro_nao" class="form-check-label">Não</label>
                    </div>
                    <div class="form-check">
                        <input type="radio"
                            id="estrangeiro_sim"
                            name="estrangeiro"
                            value="S"
                            class="form-check-input">
                        <label for="estrangeiro_sim" class="form-check-label">Sim</label>
                    </div>
                </div>
            </div>

            <div class="form-group">
                <label for="curso" class="required">Curso</label>
                <select id="curso"
                    name="id_curso"
                    class="form-control"
                    required>
                    <option value="">Selecione um curso</option>
                    <?php if (!empty($cursos)) : ?>
                        <?php foreach ($cursos as $curso) : ?>
                            <option value="<?= $curso->getId() ?>">
                                <?= htmlspecialchars($curso->getNome()) ?> 
                                (<?php if ($curso->getTurno() === 'M') : ?>
                                    Matutino
                                <?php elseif ($curso->getTurno() === 'V') : ?>
                                    Vespertino
                                <?php else : ?>
                                    Noturno
                                <?php endif; ?>)
                            </option>
                        <?php endforeach; ?>
                    <?php else : ?>
                        <option value="" disabled>
                            <?= isset($erro_cursos) ? 'Erro ao carregar cursos' : 'Nenhum curso disponível' ?>
                        </option>
                    <?php endif; ?>
                </select>
            </div>

            <div class="form-actions">
                <button type="submit" class="btn btn-success">
                    ✓ Cadastrar Aluno
                </button>
                <a href="listar.php" class="btn btn-primary">
                    ← Voltar à Listagem
                </a>
            </div>
        </form>
    </div>
</div>

<?php
include_once __DIR__ . '/../include/footer.php';
?>