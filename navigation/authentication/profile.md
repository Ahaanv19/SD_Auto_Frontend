---
layout: base
title: Profile Settings
permalink: /profile
search_exclude: true
---

<style>
    #profileImageBox img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 9999px;
    }

    #profileImageBox p {
        margin: 0;
        text-align: center;
        color: #64748b;
        font-size: 0.95rem;
        line-height: 1.6;
    }

    .dark #profileImageBox p {
        color: #94a3b8;
    }
</style>

<section class="mx-auto max-w-6xl space-y-8">
    <div class="max-w-3xl space-y-4">
        <span class="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary-700 dark:border-primary-900/60 dark:bg-primary-950/40 dark:text-primary-300">
            Account Center
        </span>
        <h1 class="max-w-2xl text-4xl sm:text-5xl">Manage Your Macro Cosmos Profile</h1>
        <p class="max-w-2xl text-lg text-slate-600 dark:text-slate-300">
            Update your public account details, rotate credentials, and keep your profile photo current without leaving the dashboard.
        </p>
    </div>

    <div class="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <aside class="rounded-[2rem] border border-slate-200/70 bg-white/80 p-8 shadow-medium backdrop-blur-sm dark:border-slate-700/60 dark:bg-slate-900/70">
            <div class="space-y-6">
                <div>
                    <p class="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Profile Photo</p>
                    <h2 class="mt-3 text-3xl">Your Account Identity</h2>
                    <p class="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                        Use a clear profile image so your account is recognizable across saved routes, reports, and subscription tools.
                    </p>
                </div>

                <div class="rounded-[1.75rem] border border-slate-200/70 bg-slate-50/80 p-6 dark:border-slate-700/60 dark:bg-slate-950/40">
                    <div id="profileImageBox" class="mx-auto flex h-52 w-52 items-center justify-center overflow-hidden rounded-full border border-dashed border-slate-300 bg-white p-3 shadow-soft dark:border-slate-700 dark:bg-slate-900">
                        <p>No profile picture available.</p>
                    </div>

                    <input type="file" id="profilePicture" class="sr-only" accept="image/*" onchange="saveProfilePicture()">

                    <label for="profilePicture" class="mt-6 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm font-semibold text-slate-700 transition hover:border-primary-400 hover:text-primary-700 hover:shadow-soft dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-primary-500 dark:hover:text-primary-300">
                        <i class="fas fa-upload"></i>
                        Upload Profile Picture
                    </label>

                    <p id="profile-message" class="mt-4 min-h-6 text-sm font-medium text-rose-600 dark:text-rose-400"></p>
                </div>

                <div class="rounded-[1.5rem] border border-slate-200/70 bg-slate-50/80 p-6 dark:border-slate-700/60 dark:bg-slate-950/40">
                    <h3 class="text-xl">Before You Update</h3>
                    <ul class="mt-4 space-y-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                        <li>Changing your username or password signs you out immediately.</li>
                        <li>Name updates apply to the visible account label in the shared shell.</li>
                        <li>Your current values are loaded into the field placeholders when available.</li>
                    </ul>
                </div>
            </div>
        </aside>

        <section class="rounded-[2rem] border border-slate-200/70 bg-white/80 p-8 shadow-medium backdrop-blur-sm dark:border-slate-700/60 dark:bg-slate-900/70">
            <div class="space-y-3">
                <p class="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Account Details</p>
                <h2 class="text-3xl">Security And Identity</h2>
                <p class="text-sm leading-7 text-slate-600 dark:text-slate-300">
                    Each field saves on change, so only update the values you intend to replace.
                </p>
            </div>

            <form class="mt-8 grid gap-6">
                <div class="rounded-[1.5rem] border border-slate-200/70 bg-slate-50/70 p-6 dark:border-slate-700/60 dark:bg-slate-950/30">
                    <label for="newUid" class="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">Username</label>
                    <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">Update the unique ID you use to sign in.</p>
                    <input type="text" id="newUid" placeholder="New username" class="mt-4 w-full" autocomplete="username">
                    <p id="uid-message" class="mt-3 min-h-5 text-sm font-medium text-rose-600 dark:text-rose-400"></p>
                </div>

                <div class="rounded-[1.5rem] border border-slate-200/70 bg-slate-50/70 p-6 dark:border-slate-700/60 dark:bg-slate-950/30">
                    <label for="newName" class="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">Display Name</label>
                    <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">Control how your account appears in shared navigation and profile surfaces.</p>
                    <input type="text" id="newName" placeholder="New display name" class="mt-4 w-full" autocomplete="name">
                    <p id="name-message" class="mt-3 min-h-5 text-sm font-medium text-rose-600 dark:text-rose-400"></p>
                </div>

                <div class="rounded-[1.5rem] border border-slate-200/70 bg-slate-50/70 p-6 dark:border-slate-700/60 dark:bg-slate-950/30">
                    <label for="newPassword" class="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">Password</label>
                    <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">Choose a fresh password if you need to rotate credentials.</p>
                    <input type="password" id="newPassword" placeholder="New password" class="mt-4 w-full" autocomplete="new-password">
                    <p id="password-message" class="mt-3 min-h-5 text-sm font-medium text-rose-600 dark:text-rose-400"></p>
                </div>
            </form>

            <div class="mt-8 hidden" aria-hidden="true">
                <table class="w-full">
                    <tbody id="profileResult"></tbody>
                </table>
            </div>
        </section>
    </div>
</section>

<script type="module">
// Import fetchOptions from config.js
import {pythonURI, fetchOptions } from '{{site.baseurl}}/assets/js/api/config.js';
// Import functions from config.js
import { putUpdate, postUpdate, deleteData, logoutUser } from "{{site.baseurl}}/assets/js/api/profile.js";

// Function to update table with fetched data
function updateTableWithData(data) {
   const tableBody = document.getElementById('profileResult');
   if (!tableBody) {
       return;
   }
   tableBody.innerHTML = '';

   data.sections.forEach((section, index) => {
       const tr = document.createElement('tr');
       const themeCell = document.createElement('td');
       const nameCell = document.createElement('td');
       const yearCell = document.createElement('td');

       themeCell.textContent = section.theme;
       nameCell.textContent = section.name;

       const trashIcon = document.createElement('i');
       trashIcon.className = 'fas fa-trash-alt trash-icon';
       trashIcon.style.marginLeft = '10px';
       themeCell.appendChild(trashIcon);

       trashIcon.addEventListener('click', async function (event) {
           event.preventDefault();
           const URL = pythonURI + "/api/user/section";
           // Remove the row from the table
           tr.remove();

           const options = {
               URL,
               body: { sections: [section.theme] },
               message: 'profile-message',
           };

           try {
               await deleteData(options);
           } catch (error) {
               console.error('Error deleting section:', error.message);
               document.getElementById('profile-message').textContent = 'Error deleting section: ' + error.message;
           }
       });

      yearCell.classList.add('editable'); // Make year cell editable
      yearCell.innerHTML = `${section.year} <i class="fas fa-pencil-alt edit-icon" style="margin-left: 10px;"></i>`;

       // Make the year cell editable
       yearCell.addEventListener('click', function () {
           const input = document.createElement('input');
           input.type = 'text';
           input.value = section.year;
           input.className = 'edit-input';
           yearCell.innerHTML = '';
           yearCell.appendChild(input);

           input.focus();

           input.addEventListener('blur', async function () {
               const newYear = input.value;
               const URL = pythonURI + "/api/user/section";
               const options = {
                   URL,
                   body: { section: { theme: section.theme, year: newYear } },
                   message: 'profile-message',
               };

               try {
                   await putUpdate(options);
               } catch (error) {
                   console.error('Error updating year:', error.message);
                   document.getElementById('profile-message').textContent = 'Error updating year: ' + error.message;
               }

               yearCell.textContent = newYear;
           });

           input.addEventListener('keydown', function (event) {
               if (event.key === 'Enter') {
                   input.blur();
               }
           });
       });
       tr.appendChild(themeCell);
       tr.appendChild(nameCell);
       tr.appendChild(yearCell);

       tableBody.appendChild(tr);
   });

}

// Function to fetch user profile data
async function fetchUserProfile() {
    const URL = pythonURI + "/api/id/pfp"; // Endpoint to fetch user profile data

    try {
        const response = await fetch(URL, fetchOptions);
        if (!response.ok) {
            throw new Error(`Failed to fetch user profile: ${response.status}`);
        }

        const profileData = await response.json();
        displayUserProfile(profileData);
    } catch (error) {
        console.error('Error fetching user profile:', error.message);
        // Handle error display or fallback mechanism
    }
}

// Function to display user profile data
function displayUserProfile(profileData) {
    const profileImageBox = document.getElementById('profileImageBox');
    if (profileData.pfp) {
        const img = document.createElement('img');
        img.src = `data:image/jpeg;base64,${profileData.pfp}`;
        img.alt = 'Profile Picture';
        profileImageBox.innerHTML = ''; // Clear existing content
        profileImageBox.appendChild(img); // Append new image element
    } else {
        profileImageBox.innerHTML = '<p>No profile picture available.</p>';
    }

    // Display other profile information as needed
    // Example: Update HTML elements with profileData.username, profileData.email
}

// Function to save profile picture
window.saveProfilePicture = async function () {

    const fileInput = document.getElementById('profilePicture');
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function() {
            const profileImageBox = document.getElementById('profileImageBox');
            profileImageBox.innerHTML = `<img src="${reader.result}" alt="Profile Picture">`;
        };
        reader.readAsDataURL(file);
    }

    if (!file) return;

    try {
        const base64String = await convertToBase64(file);
        await sendProfilePicture(base64String);
        console.log('Profile picture uploaded successfully!');

    } catch (error) {
        console.error('Error uploading profile picture:', error.message);
        // Handle error display or fallback mechanism
    }
}

// Function to convert file to base64
async function convertToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(',')[1]); // Remove the prefix part of the result
        reader.onerror = error => reject(error);
        reader.readAsDataURL(file);
    });
}

// Function to send profile picture to server
async function sendProfilePicture(base64String) {
   const URL = pythonURI + "/api/id/pfp"; // Adjust endpoint as needed

   // Create options object for PUT request
   const options = {
       URL,
       body: { pfp: base64String },
       message: 'profile-message', // Adjust the message area as needed
       callback: () => {
           console.log('Profile picture uploaded successfully!');
           // Handle success response as needed
       }
   };

   try {
       await putUpdate(options);
   } catch (error) {
       console.error('Error uploading profile picture:', error.message);
       document.getElementById('profile-message').textContent = 'Error uploading profile picture: ' + error.message;
   }
}
  // Function to update UI with new UID and change placeholder
window.updateUidField = function(newUid) {
  const uidInput = document.getElementById('newUid');
  uidInput.value = newUid;
  uidInput.placeholder = newUid;
}

// Function to update UI with new Name and change placeholder
window.updateNameField = function(newName) {
  const nameInput = document.getElementById('newName');
  nameInput.value = newName;
  nameInput.placeholder = newName;
}

// Function to change UID
window.changeUid = async function(uid) {
   if (uid) {
       const URL = pythonURI + "/api/user"; // Adjusted endpoint

       const options = {
           URL,
           body: { uid },
           message: 'uid-message', // Adjust the message area as needed
           callback: () => {
               alert("You updated your Github ID, so you will automatically be logged out. Be sure to remember your new github id to log in!");
               console.log('UID updated successfully!');
               window.updateUidField(uid);
               window.location.href = '{{site.baseurl}}/login'
           }
       };

       try {
           await putUpdate(options);
       } catch (error) {
           console.error('Error updating UID:', error.message);
           document.getElementById('uid-message').textContent = 'Error updating UID: ' + error.message;
       }
   }
}

window.changePassword = async function(password) {
   if (password) {
       const URL = pythonURI + "/api/user"; // Adjusted endpoint

       const options = {
           URL,
           body: { password },
           message: 'password-message', // Adjust the message area as needed
           callback: () => {
               console.log('Password updated successfully!');
               window.location.href = '{{site.baseurl}}/login'

           }
       };

       try {
            alert("You updated your password, so you will automatically be logged out. Be sure to remember your password!");
           await putUpdate(options);
           await logoutUser();
       } catch (error) {
           console.error('Error updating password:', error.message);
           document.getElementById('password-message').textContent = 'Error updating password: ' + error.message;
       }
   }
}

// Function to change Name
window.changeName = async function(name) {
   if (name) {
       const URL = pythonURI + "/api/user";
       const options = {
           URL,
           body: { name },
           message: 'name-message',
           callback: () => {
               console.log('Name updated successfully!');
               window.updateNameField(name);
           }
       };
       try {
           await putUpdate(options);
       } catch (error) {
           console.error('Error updating Name:', error.message);
           document.getElementById('name-message').textContent = 'Error updating Name: ' + error.message;
       }
   }
}

// Event listener to trigger updateUid function when UID field is changed
document.getElementById('newUid').addEventListener('change', function() {
    const uid = this.value;
    window.changeUid(uid);

});

// Event listener to trigger updateName function when Name field is changed
document.getElementById('newName').addEventListener('change', function() {
    const name = this.value;
    window.changeName(name);

});

document.getElementById('newPassword').addEventListener('change', function() {
    const password = this.value;
    window.changePassword(password);

});

// Function to fetch Name from backend
window.fetchUid = async function() {
    const URL = pythonURI + "/api/user";

    try {
        const response = await fetch(URL, fetchOptions);
        if (!response.ok) {
            throw new Error(`Failed to fetch UID: ${response.status}`);
        }

        const data = await response.json();
        return data.uid;
    } catch (error) {
        console.error('Error fetching UID:', error.message);
        return null;
    }
};

window.fetchName = async function() {
    const URL = pythonURI + "/api/user"; // Adjusted endpoint

    try {
        const response = await fetch(URL, fetchOptions);
        if (!response.ok) {
            throw new Error(`Failed to fetch Name: ${response.status}`);
        }

        const data = await response.json();
        return data.name;
    } catch (error) {
        console.error('Error fetching Name:', error.message);
        return null;
    }
};

// Function to set placeholders for UID and Name
window.setPlaceholders = async function() {
    const uidInput = document.getElementById('newUid');
    const nameInput = document.getElementById('newName');

    try {
        const uid = await window.fetchUid();
        const name = await window.fetchName();

        if (uid !== null) {
            uidInput.placeholder = uid;
        }
        if (name !== null) {
            nameInput.placeholder = name;
        }
    } catch (error) {
        console.error('Error setting placeholders:', error.message);
    }
};

// Call and initializeProfileSetup when DOM content is loaded
document.addEventListener('DOMContentLoaded', async function () {
    try {
        await fetchUserProfile(); // Fetch user profile data
        await setPlaceholders();
    } catch (error) {
        console.error('Initialization error:', error.message);
        // Handle initialization error gracefully
    }
});

</script>
