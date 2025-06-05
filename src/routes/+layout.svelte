<script>

    let searchTerm = ""
                    
</script>


<header class="headBar">   
    <nav class="navBar">
    <a href="/" id="title">To-Do</a>
    <a href="/guide" class="link">Guide</a>
    <a href="/" class="link">Log in</a>
    </nav>
</header>

<slot />

<style>
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        border: 0;
    }

    .headBar {
        position: sticky;
        top: 0;
        align-items: center;
        display: flex;
        width: 100%;
        
        height: fit-content;
        min-height: 50px;
        height: 9vh;
        max-height: 75px;
        border-bottom: 3px;
        border-color: #ccc;
        border-style: solid;
        background-color: #f8f9fa;
    }
    
    .navBar {
        padding: 0 20px;
        width: 100%;
    }

    .navBar a {
        display: block;
        text-align: center;
        margin: 0 8px;
    }

    #title {
        float: left;
        text-decoration: none;
        color: Black;
    }

    .link {
        float: right;
        text-decoration: none;
        color: black;
    }
</style>
