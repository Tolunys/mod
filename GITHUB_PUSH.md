# Düzeltmeleri GitHub'a Yükleme Rehberi

Aşağıdaki adımlar, yereldeki bu projedeki düzeltmeleri GitHub'daki uzak depoya göndermenize yardımcı olur.

## 1) Hazırlık
- Bilgisayarınızda Git kurulmuş olmalı ve GitHub hesabınıza erişiminiz bulunmalı.
- GitHub'da boş veya mevcut bir uzak depo oluşturun ve HTTPS/SSH adresini not edin (örn. `https://github.com/kullanici/proje.git`).

## 2) Mevcut durumu kontrol etme
```bash
git status
```
Çalışma alanınızdaki değişiklikleri görün. İzlenmeyen dosyalar veya değiştirdiğiniz dosyalar burada listelenir.

## 3) Değişiklikleri sahneye alma ve commit atma
```bash
git add .
git commit -m "Düzeltmeleri uygula"
```
`git add .` tüm değişiklikleri sahneye alır; isterseniz tek tek dosya da ekleyebilirsiniz (örn. `git add app/components/DotAnimation.js`).

## 4) Uzak depoyu ekleme (ilk kez gerekiyorsa)
```bash
git remote add origin <uzak-depo-adresi>
```
`<uzak-depo-adresi>` yerine GitHub'daki depo URL'nizi yazın. Eğer `origin` zaten ekliyse bu adımı atlayın veya `git remote -v` ile kontrol edin.

## 5) Güncel olup olmadığınızı kontrol etme (önerilir)
```bash
git pull --rebase origin <ana-branch>
```
`<ana-branch>` çoğu projede `main` veya `master` olur. Çakışma çıkarsa çözüp `git rebase --continue` ile ilerleyin.

## 6) Değişiklikleri GitHub'a gönderme
```bash
git push origin <branch-adiniz>
```
`<branch-adiniz>` yerelde çalıştığınız branch adıdır (örn. `main`, `feature/temizlik`). Komut başarıyla biterse GitHub'da değişiklikleri görebilirsiniz.

## 7) Pull request açma (gerekiyorsa)
- Branch'ınızı GitHub'a ittikten sonra depo sayfasında “Compare & pull request” butonunu kullanın.
- Başlık ve açıklamayı doldurup değişiklikleri inceleyin, ardından PR'ı oluşturun.

İyi çalışmalar!
