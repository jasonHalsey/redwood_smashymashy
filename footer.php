	<div class="footer">
		<div class="container">
			<a href="http://www.redwood-ventures.com/" target="_blank"><img src="<?php echo esc_url( sm_asset( 'img/redwood-ventures.png' ) ); ?>" width="100" alt=""></a>
			<h3>We exist to bring <em>joy</em> to children.</h3>
			<p>Copyright &copy; <?php echo current_time( 'Y' ); ?> Smashy Mashy. <br> All Rights Reserved.</p>
		</div>
	</div>

	<div id="contact" class="modal" data-modal-window>
		<div class="modal-window">
			<a href="#" class="modal-close" data-modal-close>&times;</a>
			<h2>Contact Us</h2>
			<?php echo do_shortcode( '[gravityform id=1 title=false description=false ajax=true]' ); ?>
		</div>
	</div>

	<?php wp_footer(); ?>
</body>
</html>
