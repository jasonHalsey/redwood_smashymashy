<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
	<div class="top">
		<div class="container">
			<ul class="nav">
				<?php /* <li><a href="/stores/" data-scroll>Find It</a></li> */ ?>
				<li><a href="/">Home</a></li>
				<?php /* <li><a href="#">Creatures</a></li>
				<li><a href="#">Downloads</a></li>
				<li><a href="#">Where to Buy</a></li> */ ?>
				<li><a href="#" data-modal="#contact">Contact</a></li>
			</ul>

			<img src="<?php echo esc_url( sm_asset( 'img/logo.png' ) ); ?>" class="logo" alt="Smashy Mashy">
			<img src="<?php echo esc_url( sm_asset( 'img/s2_sharksurpriseinside.png' ) ); ?>" class="smashy" alt="">
		</div>
	</div>
