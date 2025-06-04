<script>

      let todoLists = ["Groceries", "Homework", "Project Ideas"];

  // Function to add a new list (optional)
  function addList(title) {
    if (title) {
      todoLists = [...todoLists, title];
    }
  }

</script>

<svelte:head>
  <title>OSVK To-Do</title>
</svelte:head>

<main>
    <div>
        <div class="listHeader">
            <h1>Your To-Do lists:</h1>
        </div>
        <div class="listList">
            {#each todoLists as title}
              <div class="listItem">{title}</div>
            {/each}
        </div>
    </div>
</main>

<style>
    main {
        height: 1000px;
    }

    .listHeader {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100px;
        background-color: #f8f9fa;
        border-bottom: 2px solid #ccc;
    }

    .listList {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px;
    }
</style>
