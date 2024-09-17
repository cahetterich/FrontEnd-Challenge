document.addEventListener('DOMContentLoaded', function() {
    const ctx1 = document.getElementById('activitiesChart').getContext('2d');
    new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: ['Janeiro', 'Fevereiro', 'Março'],
            datasets: [{
                label: 'Atividades',
                data: [10, 20, 30],
                backgroundColor: 'rgb(13, 110, 253)',
                borderColor: 'rgba(6, 45, 104)',
                borderWidth: 1
            }]
        }
    });

    const ctx2 = document.getElementById('compatibilityChart').getContext('2d');
    new Chart(ctx2, {
        type: 'pie',
        data: {
            labels: ['Desenvolvedor Front-End', 'Analista de Dados'],
            datasets: [{
                label: 'Compatibilidade',
                data: [85, 78],
                backgroundColor: ['rgb(13, 110, 253)', 'rgba(54, 162, 235, 0.2)'],
                borderColor: ['rgb(6, 45, 104)', 'rgba(54, 162, 235, 1)'],
                borderWidth: 1
            }]
        }
    });
});
