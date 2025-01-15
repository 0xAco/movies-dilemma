<script lang="ts">

</script>

<footer class="footer h-8 flex justify-center items-center">
  <ul class="flex gap-10 text-sm h-full white">
    <li class="footer-li"><a href="https://github.com/0xAco/movies-dilemma" class="min-h-full flex items-center gap-1">
      <img src="github-logo.svg" alt="logo de github" class="h-6"/>
      <span class="footer-li-text text-xs">voir le projet sur github</span>
    </a></li>
    <!--<li class="footer-separator w-[1px] min-h-full"></li>-->
    <li class="footer-li"><a href="https://www.themoviedb.org/" class="min-h-full flex items-center gap-1">
      <img src="tmdb-logo.svg" alt="logo de tmdb" class="h-3"/>
      <span class="footer-li-text text-xs">donnees issues de tmdb</span>
    </a></li>
  </ul>
</footer>

<style>
  .footer {
    background-color: var(--orange);
    border-radius: 20px 20px 0 0;
    box-shadow: 4px -3px var(--yellow);
  }
  .footer-li {
    height: 100%;
  }
  .footer-li-text {
    font-family: "04b_30";
    text-decoration: underline white;
  }
  .footer-separator {
    background-color: var(--yellow);
  }
</style>