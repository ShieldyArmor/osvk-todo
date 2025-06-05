<script>
  export let data;
  const { lists } = data;
  console.log(lists.lists);
  
  let showModal = false;
  let newListName = "";
  
  function formatDate(ts) {
    const date = new Date(ts);
    return date.toLocaleString(); // or use toLocaleString() for date and time
  }

  function openModal() {
    showModal = true;
    newListName = "";
  }

  function closeModal() {
    showModal = false;
  }

function createList() {
  fetch('/api/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: newListName })
  })
    .then(async (res) => {
      if (!res.ok) {
        const err = await res.json();
        alert('Error: ' + (err.error || res.status));
        return;
      }
      // Optionally, refresh the page or update the UI here
      // For now, just close the modal and reload
      closeModal();
      location.reload();
    })
    .catch((err) => {
      alert('Network error: ' + err.message);
    });
}

</script>

<svelte:head>
  <title>OSVK To-Do</title>
</svelte:head>

<main>
    <div class="mainContainer">
        <div class="listHeader">
            <h1>Your To-Do lists:</h1>
        </div>
        <div class="listList">
            {#each Object.entries(lists.lists) as [id, list]}
              <a class="listItem" href="/list/{id}">
                <p class="listName">{list.name}</p>
                <p class="timeCreated">{formatDate(list.created)}</p>
              </a>
            {/each}
        </div>
        <div class="buttonContainer">
            <button id="newList" on:click={openModal} class="listItem">Create a new list</button>
        </div>
    </div>

  {#if showModal}
    <div
      class="modal-backdrop"
      role="button"
      tabindex="0"
      aria-label="Close modal"
      on:click={closeModal}
      on:keydown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') closeModal();
      }}
    ></div>
    <div class="modal">
      <h2>Create New List</h2>
      <input
        type="text"
        bind:value={newListName}
        placeholder="List name"
        on:keydown={(e) => e.stopPropagation()}
      />
      <div class="modal-buttons">
        <button on:click={createList} disabled={!newListName.trim()}>Create</button>
        <button on:click={closeModal}>Cancel</button>
      </div>
    </div>
  {/if}

</main>

<style>
    main {
        height: 1000px;
    }

    .mainContainer {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .listHeader {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100px;
    }

    .listList {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px;
        background-color: #f8f9fa;
        border: 2px solid #ccc;
        width: 20%;
    }

    .listItem {
        background-color: #e9ecef;
        padding: 10px;
        margin: 5px;
        border-radius: 5px;
        width: 100%;
        text-align: center;
        cursor: pointer;
        text-decoration: none;
    }

    .listItem:hover {
        background-color: #dee2e6;
    }

    .listName {
        font-size: 1.2em;
        font-weight: bold;
        color: #343a40;
    }

    .timeCreated {
        font-size: 0.9em;
        color: #6c757d;
    }

    /* Modal styles */
    .modal-backdrop {
        position: fixed;
        top: 0; left: 0; right: 0; bottom: 0;
        background: rgba(0,0,0,0.4);
        z-index: 10;
    }
    .modal {
        position: fixed;
        top: 50%; left: 50%;
        transform: translate(-50%, -50%);
        background: #fff;
        padding: 2rem;
        border-radius: 8px;
        box-shadow: 0 2px 16px rgba(0,0,0,0.2);
        z-index: 11;
        min-width: 300px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .modal input {
        margin: 1rem 0;
        padding: 0.5rem;
        width: 90%;
        font-size: 1em;
    }
    .modal-buttons {
        display: flex;
        gap: 1rem;
    }
</style>
