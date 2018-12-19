<?php get_header(); ?>

<div class="media">
	<div class="container">
		<div class="monitors">
			<img src="<?php echo esc_url( sm_asset( 'img/monitors.png' ) ); ?>" class="monitors-img" alt="">

			<div class="monitors-vid">
				<div class="monitors-title">
					<div class="monitors-title-text">Smooshyville Research Facility</div>
				</div>

				<div class="youtube">
					<iframe width="560" height="315" src="https://www.youtube.com/embed/ceWfQRKS6CY?rel=0&controls=0&showinfo=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
				</div>
			</div>

			<div class="monitors-smalls">
				<div class="monitors-small -left">
					<?php // echo do_shortcode( '[instagram-feed num=1 cols=1 showheader=false showbutton=false showfollow=false imagepadding=0]' ); ?>
					<?php echo do_shortcode( '[instagram-feed]' ); ?>
				</div>

				<div class="monitors-small -right">
					<div class="monitors-small-wrap">
						<iframe width="248" height="248" src="https://www.youtube.com/embed/videoseries?list=PL_tgyvyThG7ZKPz4D0kU8Qb2ZkidtGafc&autoplay=1&controls=0&disablekb=1&loop=1&modestbranding=1&mute=1&rel=0 "frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
					</div>
				</div>
			</div>
		</div>

		<img src="<?php echo esc_url( sm_asset( 'img/desk.png' ) ); ?>" class="desk" alt="">
	</div>

	<div class="slime">
		<img src="<?php echo esc_url( sm_asset( 'img/slime.png' ) ); ?>" class="slime-static" alt="">
		<canvas class="slime-drip" width="400" height="400"></canvas>
		<div class="slime-overlay"></div>
	</div>
</div>

<div class="folders">
	<div class="container">
		<?php $stories = include get_theme_file_path( 'data/stories.php' ); ?>
		<?php $left = rand( 1, 5 ); ?>
		<?php $last = rand( 1, 5 ); ?>

		<?php $i = 0; foreach ( $stories as $story ) : ?>
			<?php while ( $left == $last ) $left = rand( 1, 5 ); ?>
			<?php $last = $left; ?>
			<article id="<?php echo sanitize_title( $story[0] ); ?>" class="folder <?php if ( $i == 0 ) echo '-open'; ?>">
				<span class="folder-tab" style="margin-left: <?php echo $left; ?>0%"><span><?php echo $story[0]; ?></span></span>

				<div class="folder-body">

					<!-- if $story[n] is an array then we make another article tag and recurse -->
					<?php

					if ( is_array($story[1])  ) : 

						$j = 0;

						$nestedleft = rand( 1, 5 );
						$nestedlast = rand( 1, 5 ); 


						foreach ($story[1] as $nestedStory ) : 
							while ( $nestedleft == $nestedlast ) $nestedleft = rand( 1, 5 );
							$nestedlast = $nestedleft;

					?>
						<article id="<?php echo sanitize_title( $nestedStory[0] ); ?>" class="folder nested <?php if ( $j == 100 ) echo '-open'; ?>">
							<!-- everything in a top level articles needs to go here like folder-paper, folder-graphic -->
							<span class="folder-tab" style="margin-left: <?php echo $nestedleft; ?>0%"><span><?php echo $nestedStory[0]; ?></span></span>
							<div class="folder-body">
								<div class="folder-paper">
									<div class="folder-graphic">
										<div class="folder-img">
											<img src="<?php echo sm_asset( $nestedStory[2] ); ?>" alt="">
										</div>

										<img src="<?php echo sm_asset( 'img/paperclip.svg' ); ?>" class="folder-paperclip" alt="">
									</div>
									<div class="folder-text">
										<h1><?php echo $nestedStory[0]; ?></h1>
										<?php echo wpautop( wptexturize( $nestedStory[1] ) ); ?>
									</div>
								</div>
							</div>
						</article>
						<?php 

						$j++;
						endforeach; 
						?>
						<div id="<?php echo sanitize_title( $story[0] ); ?>-spacer" class="spacer" style="height: 357px;">&nbsp;</div>
					<?php
					
					else:
					?>

					<div class="folder-paper">
						
						<?php if ( $story[2] ) : ?>
							<div class="folder-graphic">
								<div class="folder-img">
									<img src="<?php echo sm_asset( $story[2] ); ?>" alt="">
								</div>

								<img src="<?php echo sm_asset( 'img/paperclip.svg' ); ?>" class="folder-paperclip" alt="">
							</div>
						<?php endif; ?>

						<div class="folder-text">
							<h1><?php echo $story[0]; ?></h1>
							<?php echo wpautop( wptexturize( $story[1] ) ); ?>
						</div>
					</div>

					<?php
					endif;
					?>

					
				</div>
			</article>

			<?php if ( count( $stories ) == $i + 1 ) : ?>
				<article id="folder-last" class="folder <?php if ( $i == 0 ) echo '-open'; ?>">
					<span class="folder-tab" style="margin-left: <?php echo $left + 1; ?>0%"></span>

					<div class="folder-body">
						<img src="<?php echo sm_asset( 'img/secret.png' ); ?>" alt="">
					</div>
				</article>
			<?php endif; ?>
		<?php $i++; endforeach; ?>
	</div>
</div>

<?php get_footer();
