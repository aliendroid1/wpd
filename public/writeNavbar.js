document.write
(`
    <img src="wpdLogo.jpeg" class="img-fluid" alt="wsu logo" width="700" height="345">
        
    <nav class="navbar navbar-expand-sm bg-dark navbar-dark sticky-top">
        <a class="navbar-brand" href="index.html">WPD Resource Hub</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="collapsibleNavbar">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" href="profile.html">Profile</a>
                </li>
                <li class="nav-item">
                <a class="nav-link" href="resourceForm.html">Share Resources</a>
                </li>
                
                <li class="nav-item">
                    <a class="nav-link" href="uploadResources.html">UploadResources</a>
                </li>
             
                <li class="nav-item">
                    <a class="nav-link" href="#" id="sign-in-button" onclick="toggleSignIn()">-</a>
                </li>
            </ul>
        </div>
    </nav>
    <br>
`)