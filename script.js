// "https://randomuser.me/api/?nat=fr&results=50"

const userList = [];

async function getUsers() {
  try {
    const response = await fetch(
      "https://randomuser.me/api/?nat=fr&results=50"
    );

    if (!response.ok) {
      throw new Error(`Error ${response.status}, ${response.statusText}`);
    }

    const responseData = await response.json();

    responseData.results.forEach((element) => {
      const user = {
        picture: element.picture.thumbnail,
        firstName: element.name.first,
        lastName: element.name.last,
        email: element.email,
        phone: element.phone,
      };
      userList.push(user);
      createUsersList(user);
    });
  } catch (error) {
    console.log(error);
  }
}
getUsers();

const usersContainer = document.querySelector(".users-table");

function createUsersList(user) {
  const userCard = document.createElement("ul");
  userCard.classList.add("user-list");
  userCard.classList.add("content");

  const userCardContent = `
    <li class="user-name">
        <img src="" alt="" />
        <span></span>
    </li>
    <li class="user-mail"></li>
    <li class="user-phone"></li>
    `;
  userCard.innerHTML = userCardContent;

  userCard.querySelector(".user-name img").src = user.picture;
  userCard.querySelector(
    ".user-name img"
  ).alt = `${user.firstName} ${user.lastName}`;
  userCard.querySelector(
    ".user-name span"
  ).textContent = `${user.firstName} ${user.lastName}`;
  userCard.querySelector(".user-mail").textContent = user.email;
  userCard.querySelector(".user-phone").textContent = user.phone;

  usersContainer.appendChild(userCard);
}

const searchInput = document.querySelector("#search");
searchInput.addEventListener("input", searchUsers);
function searchUsers(e) {
  usersContainer.textContent = "";
  if (!e.target.value) {
    userList.forEach((user) => createUsersList(user));
    return;
  }

  const filterdArray = filteredTxt(e.target.value.replace(/\s/g, "")); // suppression des espaces dans le champs de saisie

  filterdArray.forEach((user) => createUsersList(user));
}

function filteredTxt(requete) {
  // il est préférable de convertir en majuscules et non en minuscule selon mdn
  return userList.filter(
    (el) =>
      el.firstName.toUpperCase().indexOf(requete.toUpperCase()) !== -1 ||
      el.lastName.toUpperCase().indexOf(requete.toUpperCase()) !== -1
  );
}
