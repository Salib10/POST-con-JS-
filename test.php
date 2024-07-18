<?php
if (isset($_POST['username'])) {
    echo htmlspecialchars($_POST['username']);
} else {
    echo 'Username non fornito';
}