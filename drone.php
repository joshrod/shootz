<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Shootz — We got the shootz!</title>
    <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet">
    <link rel="stylesheet" href="dist/css/app.css" type="text/css" />
</head> 
<body>
    <section class="header secondary">
        <nav>
            <div class="logo">
                <a href="/">
                    <img src="dist/img/logo.png"></img>
                </a>
            </div>
            <div class="navlinks sub-page">
                <ul>
                    <li><a href="/contact.php">CONTACT</a></li>
                    <li><a href="/bio.php">BIO</a></li>        
                </ul>
            </div>
            <div class="menu">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </nav>
        <div class="banner">
            <img src="dist/img/banner.jpg"></img>
        </div>
    </section>
    <section class="mobile-nav">
        <nav>
            <ul class="pages-list">
                <li><a href="/contact.php">CONTACT</a></li>
                <li><a href="/bio.php">BIO</a></li>        
            </ul>
            <ul class="reel-list">
                <li><a href="/reel.php">REEL</a></li>
                <li><a href="/motion.php">MOTION</a></li>
                <li><a href="/drone.php">DRONE</a></li>
                <li><a href="/360.php">360</a></li>
            </ul>
        </nav>
    </section>
    <section class="mobile-overlay"></section>
    <section class="lower with-content">
        <div class="content">
            <div class="vimeos">
                <?php
                    require 'vendor/autoload.php';
                    use Vimeo\Vimeo;
                    
                    $client = new Vimeo("cf372dbb621c25a6ae4fec7f5e5bc0283cf5e155", "6TJ3dwduWU46dbcmgiVCONp6Iv5AjB4H65vXbtp61pAimyP1BKTGh+d4xEfZqp6N9RHzKbKckyUjecpOd2fKSgs1IbVpgAzKDMTMNBIImWBA84j4jSpTA/AvrpaWQg9Y", "4a59b9921981fe3a30de15ea0cb784b5");
                    
                    $response = $client->request('/users/5929662/albums/5506758/videos?per_page=6', array(), 'GET');
                    $length = count($response['body']['data']);
                ?>
                <div class="vid-row" id="first-row">
                    <?php for ($i = 0; $i < ceil($length / 2); $i++):?>
                        <div class="thumbnail" data-video='<?php echo $response['body']['data'][$i]['embed']['html']; ?>'>
                            <img src="<?php
                                echo $response['body']['data'][$i]['pictures']['sizes'][3]['link'];
                            ?>"></img>
                            <div class="caption">
                                <h1 class="title"><?php echo $response['body']['data'][$i]['name']?></h1>
                            </div>
                        </div>
                    <?php endfor; ?>
                </div>
                <div class="vid-row" id="second-row">
                    <?php for ($i = 3; $i < $length; $i++):?>
                    <div class="thumbnail" data-video='<?php echo $response['body']['data'][$i]['embed']['html']; ?>'>
                        <img src="<?php
                            echo $response['body']['data'][$i]['pictures']['sizes'][3]['link'];
                        ?>"></img>
                        <div class="caption">
                            <h1 class="title"><?php echo $response['body']['data'][$i]['name']?></h1>
                        </div>
                    </div>
                <?php endfor; ?>
                </div>
            </div>
        </div>
        <div class="sidebar auxiliary">
            <ul class="secondary-nav">
                <li><a href="/reel.php">REEL</a></li>
                <li><a href="/motion.php">MOTION</a></li>
                <li class="active"><a href="/drone.php">DRONE</a></li>
                <li><a href="/360.php">360</a></li>
            </ul>
        </div>
    </section>
    <section class="vid-box">
        <div class="vid-wrapper">
            <span class="vb-close"></span>
        </div>
    </section>
    <script src="https://player.vimeo.com/api/player.js"></script>
    <script type="text/javascript" src="dist/js/app.js"></script>
</body> 
</html> 