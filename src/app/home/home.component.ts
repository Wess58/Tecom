import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @HostListener('window:scroll', ['$event']) onScrollEvent($event: any) {
    // console.log($event);
    // console.log("scrolling", window.pageYOffset);
    if (window.innerWidth > 770) {
      if ((window.pageYOffset / window.innerHeight * 100) > 90) {
        this.showArrow = true;
      } else {
        this.showArrow = false;
      }
    } else {
      if ((window.pageYOffset / window.innerHeight * 100) > 60) {
        this.showArrow = true;
      } else {
        this.showArrow = false;
      }
    }


  }

  showArrow = false;

  workImages = [
    {
      name: 'work',
      imgUrl: 'assets/images/work/IMG-7515.JPG'
    },
    {
      name: 'work',
      imgUrl: 'assets/images/work/IMG-7518.JPG'
    }, {
      name: 'work',
      imgUrl: 'assets/images/work/IMG-7522.JPG'
    }, {
      name: 'work',
      imgUrl: 'assets/images/work/Canon EOS 1200D061.JPG'
    }, {
      name: 'work',
      imgUrl: 'assets/images/work/IMG-7524.JPG'
    }, {
      name: 'work',
      imgUrl: 'assets/images/work/IMG-7515.JPG'
    },
    {
      name: 'work',
      imgUrl: 'assets/images/work/IMG-7538.JPG'
    }, {
      name: 'work',
      imgUrl: 'assets/images/work/Canon EOS 1200D070.JPG'
    },
  ];
  brandImages = [
    {
      name: 'apple',
      imgUrl: 'assets/images/phonelogos/apple-logo.svg'
    },
    {
      name: 'android',
      imgUrl: 'assets/images/phonelogos/android.svg'
    },
    {
      name: 'samsung',
      imgUrl: 'assets/images/phonelogos/samsung.svg'
    },
    {
      name: 'lg',
      imgUrl: 'assets/images/phonelogos/lg.svg'
    },
    {
      name: 'one-plus',
      imgUrl: 'assets/images/phonelogos/one-plus.svg'
    },
    {
      name: 'htc',
      imgUrl: 'assets/images/phonelogos/htc.svg'
    },
    {
      name: 'sony',
      imgUrl: 'assets/images/phonelogos/sony.svg'
    },
    {
      name: 'huawei',
      imgUrl: 'assets/images/phonelogos/huawei.svg'
    },
    {
      name: 'nokia',
      imgUrl: 'assets/images/phonelogos/nokia.svg'
    },
    {
      name: 'oppo',
      imgUrl: 'assets/images/phonelogos/oppo.svg'
    },
    {
      name: 'vivo',
      imgUrl: 'assets/images/phonelogos/vivo.svg'
    }, {
      name: 'xiaomi',
      imgUrl: 'assets/images/phonelogos/xiaomi.svg'
    }, {
      name: 'hp',
      imgUrl: 'assets/images/phonelogos/hp.svg'
    }, {
      name: 'dell',
      imgUrl: 'assets/images/phonelogos/dell.svg'
    }, {
      name: 'lenovo',
      imgUrl: 'assets/images/phonelogos/lenovo.svg'
    }, {
      name: 'asus',
      imgUrl: 'assets/images/phonelogos/asus.svg'
    }, {
      name: 'acer',
      imgUrl: 'assets/images/phonelogos/acer.svg'
    }, {
      name: 'windows-os',
      imgUrl: 'assets/images/phonelogos/windows-os.svg'
    }
  ]

  emailForm = {
    firstName: '',
    lastName: '',
    businessName: '',
    email: '',
    phone: '',
    county: '',
    town: '',
    estate: '',
    referredBy: ''
  }

  constructor() { }

  ngOnInit(): void {
    window.scroll(0, 0);

  }

  topFunction(): void {
    window.scroll({
      top: 0,
      behavior: 'smooth'
    });

  }

}
