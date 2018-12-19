<?php

/**
 * Setup
 */
add_action( 'after_setup_theme', function() {
	add_theme_support( 'title-tag' );
} );

/**
 * Assets
 */
function sm_asset( $path ) {
	return add_query_arg( [
		't' => filemtime( get_theme_file_path( 'assets/' . $path ) ),
	], get_theme_file_uri( 'assets/' . $path ) );
}

add_action( 'wp_enqueue_scripts', function() {
	wp_deregister_style( 'wpsl-styles' );
	wp_dequeue_style( 'wpsl-styles' );

	wp_enqueue_style( 'sm-fonts', 'https://fonts.googleapis.com/css?family=Special+Elite' );
	wp_enqueue_style( 'sm', sm_asset( 'dist/sm.css' ) );

	wp_enqueue_script( 'sm', sm_asset( 'dist/sm.js' ), [ 'jquery' ], '', true );
} );

remove_action( 'wp_enqueue_scripts', 'sb_instagram_styles_enqueue' );

/**
 * Gravity Forms
 */
add_filter( 'gform_submit_button', function( $button, $form ) {
	$attr = ( (array) ( new SimpleXMLElement( $button ) )->attributes() )['@attributes'];
	$attr['class'] = $attr['class'] . ' btn btn-orange';
	unset( $attr['value' ] );
	array_walk( $attr, function( &$v, $k ) {
		$v = $k . '="' . esc_attr( $v ) . '"';
	} );
	$attr = join( ' ', $attr );

	return "<button {$attr}><span>{$form['button']['text']}</span></button>";
}, 10, 2 );

/**
 * Store Locator
 */
add_filter( 'wpsl_store_meta', function( $store_meta, $store_id ) {
	$store_meta['terms'] = false;

	if ( $terms = wp_get_post_terms( $store_id, 'wpsl_store_category' ) ) {
		$store_meta['terms'] = $terms[0]->name;
	}

	return $store_meta;
}, 10, 2 );

add_filter( 'wpsl_listing_template', function( $template ) {
	return str_replace( '<%= store %>', '<%= terms %>: <%= store %>', $template );
} );

add_filter( 'wpsl_info_window_template', function( $template ) {
	return str_replace( '<%= store %>', '<%= terms %><br><%= store %>', $template );
} );
