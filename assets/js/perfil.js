// document.addEventListener('DOMContentLoaded', async () => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//         window.location.href = './login.html';
//         return;
//     }

//     try {
//         const response = await fetch('http://localhost:8080/api/user/profile', {
//             method: 'GET',
//             headers: {
//                 'Authorization': `Bearer ${token}`
//             }
//         });

//         if (response.ok) {
//             const user = await response.json();
//             // Atualize os elementos HTML com os dados do usuário
//             document.querySelector('.profile-name').textContent = `${user.firstName} ${user.lastName}`;
//             document.querySelector('.profile-about p').textContent = user.about || 'Sem informações adicionais.';
//             // Atualize outras seções conforme necessário
//         } else {
//             const error = await response.text();
//             alert(error);
//         }
//     } catch (error) {
//         console.error('Erro:', error);
//     }
// });
