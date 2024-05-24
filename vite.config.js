import { defineConfig } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import react from '@vitejs/plugin-react';
import nodePolyfills from 'vite-plugin-node-stdlib-browser';

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		host: '0.0.0.0',
	},
	plugins: [
		react(),
		nodePolyfills(),
		createHtmlPlugin({
			minify: true,
			inject: {
				data: {
					metrika: `
				  <!-- Yandex.Metrika counter -->
				  <script type="text/javascript">
					(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
					m[i].l=1*new Date();
					for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
					k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
					(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
					
					ym(97033870, "init", {
					  clickmap:true,
					  trackLinks:true,
					  accurateTrackBounce:true,
					  webvisor:true
					});
				  </script>
				  <noscript><div><img src="https://mc.yandex.ru/watch/97033870" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
				  <!-- /Yandex.Metrika counter -->
				`,
				},
			},
		}),
	],
	build: {
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (id.includes('node_modules')) {
						return id.toString().split('node_modules/')[1].split('/')[0].toString();
					}
				},
			},
			chunkSizeWarningLimit: 1000, // Увеличение лимита размера чанка (если нужно)
		},
	},
});
