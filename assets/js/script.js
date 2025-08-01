// Script para CRUD de Alunos - Tema Claro Apenas

document.addEventListener('DOMContentLoaded', function() {
    
    // Animação de entrada para elementos
    const animateElements = () => {
        const elements = document.querySelectorAll('.container, .table-container, .form-wrapper');
        elements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, 100 * (index + 1));
        });
    };
    
    // Executar animações
    animateElements();
    
    // Melhorar hover das linhas da tabela
    const tableRows = document.querySelectorAll('tbody tr');
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.01)';
            this.style.zIndex = '10';
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.zIndex = '1';
        });
    });
    
    // Confirmação melhorada para exclusão
    const deleteButtons = document.querySelectorAll('.btn-danger');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const confirmation = confirm(`
🚨 ATENÇÃO! 🚨

Tem certeza que deseja excluir este aluno?
Esta ação não pode ser desfeita.

Clique em OK para confirmar ou Cancelar para voltar.
            `);
            
            if (confirmation) {
                // Adicionar loading state
                this.classList.add('loading');
                this.innerHTML = 'Excluindo...';
                
                // Simular delay (remover em produção)
                setTimeout(() => {
                    window.location.href = this.href;
                }, 1000);
            }
        });
    });
    
    // Validação avançada de formulários
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        // Adicionar classes do Bootstrap para validação
        form.classList.add('needs-validation');
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            let firstInvalidField = null;
            
            // Validar cada campo obrigatório
            requiredFields.forEach(field => {
                const value = field.value.trim();
                
                // Remover classes anteriores
                field.classList.remove('is-invalid', 'is-valid');
                
                if (!value) {
                    field.classList.add('is-invalid');
                    isValid = false;
                    if (!firstInvalidField) firstInvalidField = field;
                } else {
                    // Validações específicas
                    if (field.type === 'number') {
                        const num = parseInt(value);
                        if (num < 14 || num > 100) {
                            field.classList.add('is-invalid');
                            isValid = false;
                            if (!firstInvalidField) firstInvalidField = field;
                        } else {
                            field.classList.add('is-valid');
                        }
                    } else if (field.type === 'text' && field.name === 'nome') {
                        if (value.length < 2) {
                            field.classList.add('is-invalid');
                            isValid = false;
                            if (!firstInvalidField) firstInvalidField = field;
                        } else {
                            field.classList.add('is-valid');
                        }
                    } else {
                        field.classList.add('is-valid');
                    }
                }
            });
            
            // Mostrar resultado da validação
            if (!isValid) {
                showMessage('Por favor, preencha todos os campos obrigatórios corretamente! ❌', 'danger');
                if (firstInvalidField) {
                    firstInvalidField.focus();
                    firstInvalidField.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            } else {
                showMessage('Formulário válido! Enviando dados... ✅', 'success');
                
                // Adicionar loading aos botões de submit
                const submitButton = form.querySelector('button[type="submit"]');
                if (submitButton) {
                    submitButton.classList.add('loading');
                    submitButton.disabled = true;
                }
                
                // Aqui você pode enviar o formulário para o servidor
                // form.submit(); // Descomente para enviar
            }
        });
        
        // Validação em tempo real
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (this.hasAttribute('required')) {
                    const value = this.value.trim();
                    
                    this.classList.remove('is-invalid', 'is-valid');
                    
                    if (value) {
                        this.classList.add('is-valid');
                    } else {
                        this.classList.add('is-invalid');
                    }
                }
            });
            
            // Remover classe inválida ao digitar
            input.addEventListener('input', function() {
                if (this.classList.contains('is-invalid') && this.value.trim()) {
                    this.classList.remove('is-invalid');
                    this.classList.add('is-valid');
                }
            });
        });
    });
    
    // Auto-resize para textareas
    const textareas = document.querySelectorAll('textarea');
    textareas.forEach(textarea => {
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + 'px';
        });
    });
    
    // Tooltip melhorado para ícones de ação
    const actionIcons = document.querySelectorAll('.action-icon');
    actionIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function(e) {
            const tooltip = document.createElement('div');
            tooltip.className = 'custom-tooltip';
            tooltip.textContent = this.alt;
            
            const rect = this.getBoundingClientRect();
            tooltip.style.cssText = `
                position: fixed;
                top: ${rect.top - 35}px;
                left: ${rect.left + (rect.width / 2)}px;
                transform: translateX(-50%);
                background: rgba(0, 0, 0, 0.9);
                color: white;
                padding: 8px 12px;
                border-radius: 6px;
                font-size: 12px;
                font-weight: 600;
                z-index: 10000;
                pointer-events: none;
                animation: tooltipFadeIn 0.3s ease;
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.1);
            `;
            
            document.body.appendChild(tooltip);
            
            this.addEventListener('mouseleave', function() {
                tooltip.remove();
            }, { once: true });
        });
    });
    
    // Contador de caracteres para campos de texto
    const textInputs = document.querySelectorAll('input[type="text"], textarea');
    textInputs.forEach(input => {
        if (input.hasAttribute('maxlength')) {
            const counter = document.createElement('div');
            counter.className = 'char-counter';
            counter.style.cssText = `
                text-align: right;
                font-size: 11px;
                color: #666;
                margin-top: 5px;
            `;
            
            input.parentNode.appendChild(counter);
            
            const updateCounter = () => {
                const current = input.value.length;
                const max = input.getAttribute('maxlength');
                counter.textContent = `${current}/${max}`;
                
                if (current > max * 0.9) {
                    counter.style.color = '#ff6b6b';
                } else {
                    counter.style.color = '#666';
                }
            };
            
            input.addEventListener('input', updateCounter);
            updateCounter();
        }
    });
    
    // Smooth scroll para links internos
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Loading state para links de navegação
    const navLinks = document.querySelectorAll('a:not([href^="#"]):not([href^="mailto"]):not([href^="tel"])');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (!this.classList.contains('btn-danger')) {
                showMessage('Carregando página... ⏳', 'info');
            }
        });
    });
});

// Função melhorada para mostrar mensagens de feedback
function showMessage(message, type = 'info', duration = 4000) {
    // Remover mensagens anteriores
    const existingAlerts = document.querySelectorAll('.floating-alert');
    existingAlerts.forEach(alert => alert.remove());
    
    const alert = document.createElement('div');
    alert.className = `floating-alert alert-${type}`;
    
    // Ícones para cada tipo
    const icons = {
        success: '✅',
        danger: '❌',
        warning: '⚠️',
        info: 'ℹ️'
    };
    
    alert.innerHTML = `
        <span class="alert-icon">${icons[type] || 'ℹ️'}</span>
        <span class="alert-message">${message}</span>
    `;
    
    alert.style.cssText = `
        position: fixed;
        top: 30px;
        right: 30px;
        z-index: 10001;
        min-width: 300px;
        max-width: 500px;
        padding: 16px 20px;
        border-radius: 12px;
        font-size: 14px;
        font-weight: 600;
        color: white;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        animation: slideInRight 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        display: flex;
        align-items: center;
        gap: 12px;
        cursor: pointer;
    `;
    
    // Cores por tipo
    const colors = {
        success: 'linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)',
        danger: 'linear-gradient(135deg, #ff6b9d 0%, #c44569 100%)',
        warning: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)',
        info: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    };
    
    alert.style.background = colors[type] || colors.info;
    
    // Botão de fechar
    const closeBtn = document.createElement('span');
    closeBtn.innerHTML = '×';
    closeBtn.style.cssText = `
        margin-left: auto;
        font-size: 20px;
        cursor: pointer;
        opacity: 0.7;
        transition: opacity 0.3s ease;
    `;
    
    closeBtn.addEventListener('mouseenter', () => closeBtn.style.opacity = '1');
    closeBtn.addEventListener('mouseleave', () => closeBtn.style.opacity = '0.7');
    closeBtn.addEventListener('click', () => removeAlert(alert));
    
    alert.appendChild(closeBtn);
    document.body.appendChild(alert);
    
    // Fechar automaticamente
    setTimeout(() => removeAlert(alert), duration);
    
    // Fechar ao clicar
    alert.addEventListener('click', () => removeAlert(alert));
}

// Função para remover alertas com animação
function removeAlert(alert) {
    if (alert && alert.parentNode) {
        alert.style.animation = 'slideOutRight 0.3s ease forwards';
        setTimeout(() => {
            if (alert.parentNode) {
                alert.remove();
            }
        }, 300);
    }
}

// Adicionar estilos CSS para animações via JavaScript
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    @keyframes tooltipFadeIn {
        from {
            opacity: 0;
            transform: translateX(-50%) translateY(5px);
        }
        to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
    }
    
    .is-invalid {
        border-color: #ff6b6b !important;
        box-shadow: 0 0 0 4px rgba(255, 107, 107, 0.15) !important;
        animation: shake 0.5s ease-in-out;
    }
    
    .is-valid {
        border-color: #4ecdc4 !important;
        box-shadow: 0 0 0 4px rgba(78, 205, 196, 0.15) !important;
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
    
    .char-counter {
        transition: color 0.3s ease;
    }
    
    .floating-alert:hover {
        transform: scale(1.02);
        transition: transform 0.3s ease;
    }
`;
document.head.appendChild(styleSheet);
