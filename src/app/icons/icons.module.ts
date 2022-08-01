import { NgModule } from '@angular/core';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart, faGun, faShieldHalved, faVirus, faBolt, faMagicWandSparkles, faArrowLeft, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';


@NgModule({
  exports: [FontAwesomeModule],
})
export class IconsModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(
      faArrowLeft,
      faHeart,
      faGun,
      faShieldHalved,
      faMagicWandSparkles,
      faVirus,
      faBolt,
      faMagnifyingGlass
    )
  }
}
