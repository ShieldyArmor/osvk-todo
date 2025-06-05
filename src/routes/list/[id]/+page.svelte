<script>
  export let data;
  let { list, id } = data;

  let newItemText = "";

  async function toggleCompleted(index) {
    list.items[index].completed = !list.items[index].completed;
    const res = await fetch(`/api/list/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(list)
    });
    if (res.ok) {
      const updated = await fetch(`/api/list/${id}`);
      if (updated.ok) {
        list = await updated.json();
      }
    } else {
      alert('Failed to update item');
    }
  }

  async function addItem() {
    const text = newItemText.trim();
    if (!text) return;
    // Add new item locally
    list.items = [...list.items, { text, completed: false }];
    newItemText = "";
    // Send updated list to backend
    const res = await fetch(`/api/list/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(list)
    });
    if (res.ok) {
      const updated = await fetch(`/api/list/${id}`);
      if (updated.ok) {
        list = await updated.json();
      }
    } else {
      alert('Failed to add item');
    }
  }

  async function deleteItem(index) {
    // Remove item locally
    list.items = list.items.filter((_, i) => i !== index);
    // Send updated list to backend
    const res = await fetch(`/api/list/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(list)
    });
    if (res.ok) {
      const updated = await fetch(`/api/list/${id}`);
      if (updated.ok) {
        list = await updated.json();
      }
    } else {
      alert('Failed to delete item');
    }
  }

  function goBack() {
    history.back();
  }
</script>

<svelte:head>
  <title>{list?.name ?? 'List'}</title>
</svelte:head>

<main>
  <button class="back-btn" on:click={goBack}>&larr; Back to all lists</button>
  <h1>{list?.name ?? 'List not found'}</h1>
  <form class="add-form" on:submit|preventDefault={addItem}>
    <input
      type="text"
      placeholder="Add new task..."
      bind:value={newItemText}
      autocomplete="off"
    />
    <button type="submit" disabled={!newItemText.trim()}>Add</button>
  </form>
  {#if list && list.items && list.items.length > 0}
    <ul class="task-list">
      {#each list.items as item, i}
        <li>
          <input
            type="checkbox"
            checked={item.completed}
            on:change={() => toggleCompleted(i)}
          />
          <span class:completed={item.completed}>{item.text}</span>
          <button
            class="delete-btn"
            title="Delete"
            on:click={() => deleteItem(i)}
            aria-label="Delete item"
            type="button"
          >&#10005;</button>
        </li>
      {/each}
    </ul>
  {:else}
    <p>No tasks in this list.</p>
  {/if}
</main>

<style>
  main {
    max-width: 500px;
    margin: 2rem auto;
    padding: 1rem;
    background: #f8f9fa;
    border-radius: 8px;
    box-shadow: 0 2px 8px #0001;
  }
  .back-btn {
    margin-bottom: 1rem;
    background: none;
    border: none;
    color: #007bff;
    font-size: 1rem;
    cursor: pointer;
    text-decoration: underline;
  }
  .back-btn:hover {
    color: #0056b3;
  }
  h1 {
    margin-bottom: 1.5rem;
    text-align: center;
  }
  .add-form {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
    justify-content: center;
  }
  .add-form input[type="text"] {
    flex: 1;
    padding: 0.5rem;
    font-size: 1rem;
    border-radius: 4px;
    border: 1px solid #ccc;
  }
  .add-form button {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    border-radius: 4px;
    border: none;
    background: #007bff;
    color: #fff;
    cursor: pointer;
  }
  .add-form button:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
  .task-list {
    list-style: none;
    padding: 0;
  }
  .task-list li {
    display: flex;
    align-items: center;
    margin-bottom: 0.75rem;
    background: #fff;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    box-shadow: 0 1px 3px #0001;
    position: relative;
  }
  .task-list input[type="checkbox"] {
    margin-right: 1rem;
  }
  .completed {
    text-decoration: line-through;
    color: #888;
  }
  .delete-btn {
    margin-left: auto;
    background: none;
    border: none;
    color: #bbb;
    font-size: 1.2em;
    cursor: pointer;
    transition: color 0.2s;
    padding: 0 0.5em;
    line-height: 1;
  }
  .delete-btn:hover {
    color: #e74c3c;
  }
</style>